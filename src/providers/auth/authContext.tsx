import { createContext } from "react";

export interface AuthContext {
  isSignedIn: boolean;
  signIn(signInPayload: { email: string; password: string }): Promise<void>;
  signOut(): Promise<void>;
  signUp(signUpPayload: {
    name: string;
    email: string;
    password: string;
  }): Promise<void>;
  refreshAuthStatus(): Promise<boolean>;
}

const voidFn = async () => {
  throw new Error("Cant find auth provider");
};

const initialContextValue: AuthContext = {
  isSignedIn: false,
  signIn: voidFn,
  signOut: voidFn,
  signUp: voidFn,
  refreshAuthStatus: voidFn,
};

export const authContext = createContext<AuthContext>(initialContextValue);
