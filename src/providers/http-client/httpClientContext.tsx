import { createContext } from "react";
import { Observable, createSubject } from "../../utils/subject";

export interface HttpClientContext {
  get<Res>(url: string): Promise<Res>;
  post<Res, U>(url: string, payload?: U): Promise<Res>;
  authExpired$: Observable;
}

export const authExpiredSubject = createSubject();
export const authExpired$ = authExpiredSubject.asObservable();

const voidFn = async () => {
  throw new Error("Cant find http client provider");
};

const initialContextValue: HttpClientContext = {
  get: voidFn,
  post: voidFn,
  authExpired$,
};

export const httpClientContext =
  createContext<HttpClientContext>(initialContextValue);
