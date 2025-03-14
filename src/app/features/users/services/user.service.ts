import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QueryBuilderService } from '../../../core/services/query-builder.service';
import { Observable } from 'rxjs/internal/Observable';
import { UserResponse } from '../models/userQueryResponse';
import { UserQueryRequest } from '../models/userQueryRequest';

/**
 * Service to interact with user data.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  /**
   * Constructor
   * @param httpClient - HTTP client
   * @param queryBuilder - Query builder service
   */
  constructor(private httpClient: HttpClient, private queryBuilder: QueryBuilderService) {}

  /**
   * Gets users by query parameters.
   * @param parameters - Query parameters
   * @returns - Users response
   */
  getUsersByQuery(parameters: UserQueryRequest): Observable<UserResponse> {
    const params = this.queryBuilder.buildQuery(parameters);

    return this.httpClient.get<UserResponse>('http://localhost:3000/users', {params});
  }
}
