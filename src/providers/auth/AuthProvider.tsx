import { PropsWithChildren, useCallback, useMemo, useState } from "react";
import { AuthContext, authContext } from "./authContext";
import { useHttpClient } from "../http-client/useHttpClient";
import { endpoints } from "../../constants";

export function AuthProvider({ children }: PropsWithChildren) {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const httpClient = useHttpClient();

  const signIn: AuthContext["signIn"] = useCallback(
    async (signInPayload) => {
      try {
        await httpClient.post(`${endpoints.SIGN_IN}`, signInPayload);
        setIsSignedIn(true);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        throw new Error(e.message ?? "Unable to sign in");
      }
    },
    [httpClient]
  );

  const signUp: AuthContext["signUp"] = useCallback(
    async (userData) => {
      try {
        await httpClient.post(`${endpoints.SIGN_IN}`, userData);
        setIsSignedIn(true);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        throw new Error(e.message ?? "Unable to sign up");
      }
    },
    [httpClient]
  );

  const signOut = useCallback(async () => {
    await httpClient.post(`${endpoints.SIGN_OUT}`);
    setIsSignedIn(false);
  }, [httpClient]);

  const refreshAuthStatus = useCallback(async () => {
    try {
      await httpClient.post(`${endpoints.VERIFY_TOKEN}`);
      setIsSignedIn(true);
      return true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setIsSignedIn(false);
      return false;
    }
  }, [httpClient]);

  const authContextValue: AuthContext = useMemo(
    () => ({ isSignedIn, signIn, signUp, signOut, refreshAuthStatus }),
    [isSignedIn, signIn, signOut, signUp, refreshAuthStatus]
  );

  return (
    <authContext.Provider value={authContextValue}>
      {children}
    </authContext.Provider>
  );
}
