import axios from 'axios'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import { useAuthStore } from '@/stores/AuthStore.ts'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const authStore = useAuthStore()
    if (authStore.token) {
      config.headers.set('Authorization', `Bearer ${authStore.token}`)
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
      }
    }
    return Promise.reject(error)
  },
)

const api = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return axiosInstance.get<T>(url, config).then((res) => res.data)
  },
  post: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return axiosInstance.post<T>(url, data, config).then((res) => res.data)
  },
  put: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return axiosInstance.put<T>(url, data, config).then((res) => res.data)
  },
  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return axiosInstance.delete<T>(url, config).then((res) => res.data)
  },
}

export default api
