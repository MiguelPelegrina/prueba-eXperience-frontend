import { User } from "./user";

/**
 * Defines query parameters for user filtering and pagination.
 */
export interface UserResponse {
  data: User[];
  totalResults: number;
  totalPages: number;
  currentPage: number;
}
