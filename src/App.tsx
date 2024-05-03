import { PropsWithChildren, useEffect, useRef } from "react";
import { useAuthContext } from "./providers/auth/useAuth";

export function App(props: PropsWithChildren) {
  const auth = useAuthContext();

  const isAuthStatusCheckedRef = useRef(false);

  useEffect(() => {
    if (!isAuthStatusCheckedRef.current) {
      auth.refreshAuthStatus().then(() => {
        isAuthStatusCheckedRef.current = true;
      });
    }
  }, [auth]);

  return props.children;
}
