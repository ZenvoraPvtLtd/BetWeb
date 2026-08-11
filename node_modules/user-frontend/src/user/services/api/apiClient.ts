const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.exch.techdemos.online';

export const apiClient = {
  get<T>(endpoint: string): Promise<T> {
    console.log(`[API Client] GET request to ${BASE_URL}${endpoint}`);
    return Promise.resolve({} as T);
  },
  post<T>(endpoint: string, data: any): Promise<T> {
    console.log(`[API Client] POST request to ${BASE_URL}${endpoint}`, data);
    return Promise.resolve({} as T);
  },
};
