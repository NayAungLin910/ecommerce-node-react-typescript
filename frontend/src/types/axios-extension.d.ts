import "axios";
import { Token } from "react-stripe-checkout";

declare module "axios" {
  export interface AxiosRequestConfig {
    tokenId?: Token;
    amount?: number;
  }
  export interface CreateAxiosDefaults {
    baseURL?: string | undefined;
  }
}
