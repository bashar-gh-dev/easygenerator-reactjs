import { PropsWithChildren, useCallback, useMemo } from "react";
import {
  HttpClientContext,
  httpClientContext,
  authExpiredSubject,
} from "./httpClientContext";
import axios, { HttpStatusCode } from "axios";
import { endpoints } from "../../constants";

export function HttpClientProvider({ children }: PropsWithChildren) {
  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
      timeout: parseInt(import.meta.env.VITE_REQUEST_TIMEOUT),
      withCredentials: true,
    });
    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (
          error?.response?.status === HttpStatusCode.Forbidden &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          try {
            await instance.post(endpoints.REFRESH_TOKEN);
            return await instance(originalRequest);
          } catch (_e) {
            authExpiredSubject.next();
            throw error;
          }
        } else {
          throw error;
        }
      }
    );
    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.data) throw error.response.data;
        throw error;
      }
    );
    return instance;
  }, []);

  const get = useCallback(
    async (url: string) => {
      return await axiosInstance.get(url);
    },
    [axiosInstance]
  );

  const post = useCallback(
    async (url: string, payload?: unknown) => {
      return payload
        ? await axiosInstance.post(url, payload)
        : await axiosInstance.post(url);
    },
    [axiosInstance]
  );

  // @ts-expect-error: noStrictGenericChecks
  const httpClientContextValue: HttpClientContext = useMemo(
    () => ({ get, post }),
    [get, post]
  );

  return (
    <httpClientContext.Provider value={httpClientContextValue}>
      {children}
    </httpClientContext.Provider>
  );
}
