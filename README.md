# Upgates TypeScript SDK

A TypeScript SDK for working with the Upgates API. This library provides a simple interface for managing orders in Upgates e-commerce platform.

## Installation

```bash
npm install @bicisteadm/upgates-ts-sdk
```

## Configuration

Create a `.env` file based on `.env.example` and fill in the required credentials:

```env
UPGATES_API_URL=https://your-shop.admin.upgates.com/api/v2
UPGATES_API_LOGIN=your_api_login
UPGATES_API_KEY=your_api_key
```

## Basic Usage

```typescript
import { UpgatesClient } from 'upgates-ts-sdk';

// Create a client instance
const client = new UpgatesClient({
  apiUrl: process.env.UPGATES_API_URL!,
  login: process.env.UPGATES_API_LOGIN!,
  apiKey: process.env.UPGATES_API_KEY!,
  debug: false // Optional: set to true for detailed logging
});

// Retrieve a list of orders
const orders = await client.orders.list();
console.log(`Found ${orders.number_of_items} orders`);

// Get details of a specific order
const order = await client.orders.get('123456');
console.log(`Order ${order.order_number} is in status: ${order.status}`);

// Update an order
await client.orders.update('123456', {
  status: 'processing',
  internal_note: 'Updated via API'
});

// Download an invoice PDF
const invoicePdf = await client.orders.getPdf('123456');
// Use the Blob as needed (save to file, upload, etc.)

// Get order history
const history = await client.orders.getHistory('123456');
console.log(`Order has ${history.data.length} history records`);

// Add history record
await client.orders.addHistoryRecord('123456', {
  name: 'Status change',
  value: 'Order marked as shipped'
});

// Add a file to an order
const file = new File(['file content'], 'document.pdf', { type: 'application/pdf' });
await client.orders.addFile('123456', {
  file: file,
  file_name: 'Invoice',
  code: 'invoice'
});
```

## API Reference

### Client Initialization

```typescript
const client = new UpgatesClient({
  apiUrl: string,    // Required: Upgates API URL
  login: string,     // Required: API login 
  apiKey: string,    // Required: API key
  debug?: boolean    // Optional: Enable debug logs (default: false)
});
```

### Order Operations

#### List Orders
```typescript
client.orders.list(params?: {
  page?: number;                   // Page number for pagination
  last_update_time_from?: string;  // ISO date format (e.g., '2023-01-01T00:00:00Z')
  last_update_time_to?: string;    // ISO date format
  status?: string;                 // Order status name
  status_id?: string;              // Order status ID
  resolved_yn?: '0' | '1';         // Filter by resolved status
  paid_yn?: '0' | '1';             // Filter by payment status
  language_id?: string;            // Language code
});
```

#### Get Order Details
```typescript
client.orders.get(orderNumber: string);
```

#### Create Order
```typescript
client.orders.create(order: Order);
```

#### Update Order
```typescript
client.orders.update(orderNumber: string, orderData: Partial<Order>);
```

#### Delete Order
```typescript
client.orders.delete(orderNumber: string);
```

#### Get Order PDF Invoice
```typescript
client.orders.getPdf(orderNumber: string); // Returns Blob
```

#### Get Order History
```typescript
client.orders.getHistory(orderNumber: string);
```

#### Add History Record
```typescript
client.orders.addHistoryRecord(orderNumber: string, record: {
  name: string;
  value: string;
});
```

#### Add File to Order
```typescript
client.orders.addFile(orderNumber: string, file: {
  file: File;
  file_name: string;
  code: string;
});
```

## Error Handling

The SDK throws errors for API failures or validation issues. Always wrap API calls in try/catch blocks:

```typescript
try {
  const order = await client.orders.get('123456');
  // Process order
} catch (error) {
  if (error.response) {
    // API responded with an error
    console.error('API error:', error.response.status, error.response.data);
  } else if (error.request) {
    // The request was made but no response was received
    console.error('Network error:', error.message);
  } else {
    // Something else happened while setting up the request
    console.error('Error:', error.message);
  }
}
```

## License

MIT

## Support

For support and questions, please use [GitHub Issues](https://github.com/bicisteadm/upgates-ts-sdk/issues).
