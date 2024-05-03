import { PropsWithChildren } from "react";
import { useAuthContext } from "../../providers/auth/useAuth";
import { Navigate } from "react-router-dom";
import { pages } from "../../constants";

export function IsLoggedIn(props: PropsWithChildren) {
  const auth = useAuthContext();

  if (!auth.isSignedIn) return <Navigate to={`/${pages.SIGN_IN}`} />;
  return props.children;
}
