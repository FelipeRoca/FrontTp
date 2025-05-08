import { User } from "./user.interface";

export interface CheckTokenResponse {
  us:  User;
  tok: string;
}
