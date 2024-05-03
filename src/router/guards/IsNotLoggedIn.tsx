import { PropsWithChildren } from "react";
import { useAuthContext } from "../../providers/auth/useAuth";
import { Navigate } from "react-router-dom";

export function IsNotLoggedIn(
  props: PropsWithChildren<{ redirectTo: string }>
) {
  const auth = useAuthContext();

  if (auth.isSignedIn) return <Navigate to={props.redirectTo} />;
  return props.children;
}
