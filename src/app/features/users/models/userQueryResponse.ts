import { User } from "./user";

export interface UserResponse {
  data: User[];
  totalResults: number;
  totalPages: number;
  currentPage: number;
}
