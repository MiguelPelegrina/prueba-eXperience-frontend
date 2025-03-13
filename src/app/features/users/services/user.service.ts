import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { QueryBuilderService } from '../../../core/services/query-builder.service';
import { Observable } from 'rxjs/internal/Observable';
import { UserResponse } from '../models/userQueryResponse';
import { UserQueryRequest } from '../models/userQueryRequest';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient, private queryBuilder: QueryBuilderService) {}

  // TODO Implement better HTTP practices
  getUsersByQuery(parameters: UserQueryRequest): Observable<UserResponse> {
    const params = this.queryBuilder.buildQuery(parameters);

    return this.httpClient.get<UserResponse>('http://localhost:3000/users', {params});
  }
}
