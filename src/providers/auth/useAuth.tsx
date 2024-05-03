import { useContext } from "react";
import { authContext } from "./authContext";

export const useAuthContext = () => useContext(authContext);
