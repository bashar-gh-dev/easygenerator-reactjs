import { createContext } from "react";

export interface HttpClientContext {
  get<Res>(url: string): Promise<Res>;
  post<Res, U>(url: string, payload?: U): Promise<Res>;
}

const voidFn = async () => {
  throw new Error("Cant find http client provider");
};

const initialContextValue: HttpClientContext = {
  get: voidFn,
  post: voidFn,
};

export const httpClientContext =
  createContext<HttpClientContext>(initialContextValue);
