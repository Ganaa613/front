import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const baseURL = import.meta.env.APP_API;

interface RequestConfig extends AxiosRequestConfig<Record<string, any>> {}

class HTTPService {
  private instance: AxiosInstance = axios.create({
    baseURL,
    withCredentials: false,
    proxy: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });

  constructor() {
    this.instance.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  private request = async <T>(options: AxiosRequestConfig): Promise<T> => {
    try {
      if (options.url) {
        options.url = encodeURI(options.url);
      }

      return await this.instance.request<T, any>({
        ...options,
      });
    } catch (error: any) {
      if (error && error.response && error.response.data) {
        if (error.response.data.message === "Invalid access token") {
          window.location.href = "/auth";
        }
        throw error.response.data;
      } else if (error) {
        throw error;
      }
      throw new Error("Unhandled error");
    }
  };

  get = async <T>(url: string, options?: RequestConfig): Promise<T> => {
    return await this.request<T>({
      method: "GET",
      url,
      params: options?.params,
      ...options,
    });
  };

  post = async <T>(url: string, options?: RequestConfig): Promise<T> => {
    return await this.request<T>({
      method: "POST",
      url,
      ...options,
      data: options?.data,
    });
  };

  patch = async <T>(url: string, options?: RequestConfig): Promise<T> => {
    return await this.request<T>({
      method: "PATCH",
      url,
      ...options,
      data: options?.data,
    });
  };

  delete = async <T>(url: string, options?: RequestConfig): Promise<T> => {
    return await this.request<T>({
      method: "DELETE",
      url,
      ...options,
      data: options?.data,
    });
  };
}

export default new HTTPService();
