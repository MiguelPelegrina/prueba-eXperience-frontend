import { PagingParams } from "../../shared/models/paginationParams";
import { User } from "./user";

/**
 * Defines query parameters for user filtering
 */
export type UserQueryRequest = Partial<Omit<User, 'id'>> & PagingParams
