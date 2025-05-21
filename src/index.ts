import { HttpClient, UpgatesConfig } from './http-client';
import { Orders } from './orders';

export class UpgatesClient {
  public readonly orders: Orders;

  constructor(config: UpgatesConfig) {
    const httpClient = new HttpClient(config);
    this.orders = new Orders(httpClient);
  }
}

export * from './types/order';
export { UpgatesConfig } from './http-client'; 