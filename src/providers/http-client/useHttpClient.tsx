import { useContext } from "react";
import { httpClientContext } from "./httpClientContext";

export const useHttpClient = () => useContext(httpClientContext);
