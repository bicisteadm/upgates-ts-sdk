import { HttpClient } from './http-client';
import {
  Order,
  OrderListResponse,
  OrderHistoryResponse,
  OrderHistoryRecord,
  OrderFile,
  OrderUpdateApiResponse,
  OrderUpdateResponse
} from './types/order';

export class Orders {
  constructor(private httpClient: HttpClient) {}

  async list(params?: {
    page?: number;
    last_update_time_from?: string;
    last_update_time_to?: string;
    status?: string;
    status_id?: string;
    resolved_yn?: '0' | '1';
    paid_yn?: '0' | '1';
    language_id?: string;
  }): Promise<OrderListResponse> {
    return this.httpClient.get<OrderListResponse>('/orders', { params });
  }

  async get(orderNumber: string): Promise<Order> {
    const response = await this.httpClient.get<OrderListResponse>(`/orders/${orderNumber}`);
    if (!response.orders?.[0]) {
      throw new Error('Order not found');
    }
    return response.orders[0];
  }

  async create(order: Order): Promise<Order> {
    return this.httpClient.post<Order>('/orders', {
      send_emails_yn: '0',
      send_sms_yn: '0',
      orders: [order]
    });
  }

  async update(orderNumber: string, order: Partial<Order>): Promise<OrderUpdateResponse> {
    const response = await this.httpClient.put<OrderUpdateApiResponse>(
      '/orders',
      {
        send_emails_yn: '0',
        send_sms_yn: '0',
        delete_missing_products_yn: '0',
        orders: [
          {
            order_number: orderNumber,
            ...order,
          },
        ],
      }
    );

    if (!response.orders?.[0]) {
      throw new Error('Order not found or not updated');
    }
    return response.orders[0];
  }

  async delete(orderNumber: string): Promise<void> {
    await this.httpClient.delete(`/orders?order_number=${orderNumber}`);
  }

  async getPdf(orderNumber: string): Promise<Blob> {
    return this.httpClient.getBlob(`/orders/${orderNumber}/pdf`);
  }

  async getHistory(orderNumber: string): Promise<OrderHistoryResponse> {
    return this.httpClient.get<OrderHistoryResponse>(`/orders/${orderNumber}/history`);
  }

  async addHistoryRecord(orderNumber: string, record: OrderHistoryRecord): Promise<OrderHistoryResponse> {
    return this.httpClient.post<OrderHistoryResponse>(`/orders/${orderNumber}/history`, {
      data: [record]
    });
  }

  async addFile(orderNumber: string, file: OrderFile): Promise<void> {
    const formData = new FormData();
    formData.append('file', file.file);
    formData.append('file_name', file.file_name);
    formData.append('code', file.code);

    await this.httpClient.postFormData(`/orders/${orderNumber}/file`, formData);
  }
} 