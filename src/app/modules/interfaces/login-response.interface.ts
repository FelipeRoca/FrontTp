import { User } from "./user.interface";

export interface LoginResponse {
  tok: string;
  us:  User;
}

