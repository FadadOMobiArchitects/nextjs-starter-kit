import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { COOKIE_CONFIG } from "@/constants/cookies";

// Create axios instance with base configuration
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: process.env.NAREVA_URL,
    timeout: 30000,
  });

  return instance;
};

// Server-side axios instance
export const apiClient = createAxiosInstance();

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get(COOKIE_CONFIG.AUTH_TOKEN.name);

      if (token) {
        config.headers.Authorization = `Bearer ${token.value}`;
      }

      // Set Content-Type based on data type
      if (config.data instanceof FormData) {
        // Let axios handle FormData Content-Type automatically (it will set multipart/form-data with boundary)
        delete config.headers["Content-Type"];
      } else {
        // Set JSON Content-Type for other data types
        config.headers["Content-Type"] = "application/json";
      }
    } catch (error) {
      console.error("Error getting auth token:", error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(
      error instanceof Error ? error : new Error(String(error))
    );
  }
);

// Helper function for making API requests with better error handling
export const makeRequest = async <T = any>(
  config: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await apiClient(config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle different error types
      if (error.response) {
        console.error("API Error:", error.response.data);

        // Server responded with error status
        throw new Error(
          error.response.data?.title ||
            error.response.data?.message ||
            `HTTP Error: ${error.response.status}`
        );
      } else if (error.request) {
        // Request was made but no response received
        throw new Error("Network error: No response from server");
      } else {
        // Something else happened
        throw new Error(`Request error: ${error.message}`);
      }
    }
    throw error;
  }
};

// Convenience methods for different HTTP verbs
export const apiGet = <T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  return makeRequest<T>({ ...config, method: "GET", url });
};

export const apiPost = <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  return makeRequest<T>({ ...config, method: "POST", url, data });
};

export const apiPut = <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  return makeRequest<T>({ ...config, method: "PUT", url, data });
};

export const apiDelete = <T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  return makeRequest<T>({ ...config, method: "DELETE", url });
};

export const apiPatch = <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  return makeRequest<T>({ ...config, method: "PATCH", url, data });
};

export default apiClient;
