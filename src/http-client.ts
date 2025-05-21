import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface UpgatesConfig {
  apiUrl: string;
  login: string;
  apiKey: string;
  debug?: boolean;
}

export class HttpClient {
  private client: AxiosInstance;
  private debug: boolean;

  constructor(config: UpgatesConfig) {
    this.debug = config.debug ?? false;

    if (!config.apiUrl) {
      throw new Error('API URL is required');
    }

    try {
      // Check that URL is valid
      new URL(config.apiUrl);
    } catch (error) {
      throw new Error(`Invalid API URL: ${config.apiUrl}. URL must be a valid URL including protocol (e.g. https://) and domain.`);
    }

    if (this.debug) {
      console.log('Initializing HttpClient with baseURL:', config.apiUrl);
    }

    this.client = axios.create({
      baseURL: config.apiUrl,
      auth: {
        username: config.login,
        password: config.apiKey
      },
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  private logDebug(message: string, data?: any) {
    if (this.debug) {
      console.log(message, data);
    }
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    this.logDebug('GET Request:', {
      url,
      fullUrl: `${this.client.defaults.baseURL}${url}`,
      config
    });
    const response = await this.client.get<T>(url, config);
    this.logDebug('GET Response:', {
      status: response.status,
      data: response.data
    });
    return response.data;
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    this.logDebug('POST Request:', {
      url,
      fullUrl: `${this.client.defaults.baseURL}${url}`,
      data,
      config
    });
    const response = await this.client.post<T>(url, data, config);
    this.logDebug('POST Response:', {
      status: response.status,
      data: response.data
    });
    return response.data;
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    this.logDebug('PUT Request:', {
      url,
      fullUrl: `${this.client.defaults.baseURL}${url}`,
      data,
      config
    });
    const response = await this.client.put<T>(url, data, config);
    this.logDebug('PUT Response:', {
      status: response.status,
      data: response.data
    });
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    this.logDebug('DELETE Request:', {
      url,
      fullUrl: `${this.client.defaults.baseURL}${url}`,
      config
    });
    const response = await this.client.delete<T>(url, config);
    this.logDebug('DELETE Response:', {
      status: response.status,
      data: response.data
    });
    return response.data;
  }

  async getBlob(url: string, config?: AxiosRequestConfig): Promise<Blob> {
    this.logDebug('GET Blob Request:', {
      url,
      fullUrl: `${this.client.defaults.baseURL}${url}`,
      config
    });
    const response = await this.client.get(url, {
      ...config,
      responseType: 'blob'
    });
    this.logDebug('GET Blob Response:', {
      status: response.status,
      type: response.data.type,
      size: response.data.size
    });
    return response.data;
  }

  async postFormData<T>(url: string, formData: FormData, config?: AxiosRequestConfig): Promise<T> {
    this.logDebug('POST FormData Request:', {
      url,
      fullUrl: `${this.client.defaults.baseURL}${url}`,
      formData: Object.fromEntries(formData.entries()),
      config
    });
    const response = await this.client.post<T>(url, formData, {
      ...config,
      headers: {
        ...config?.headers,
        'Content-Type': 'multipart/form-data'
      }
    });
    this.logDebug('POST FormData Response:', {
      status: response.status,
      data: response.data
    });
    return response.data;
  }
} 