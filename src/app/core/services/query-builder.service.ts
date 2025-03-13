import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QueryBuilderService {
  /**
   * Builds query params from the provided key-value pairs.
   * @param params
   * @returns
   */
  public buildQuery(params?: Object): HttpParams {
    let httpParams = new HttpParams();

    // Filter out null or undefined values and construct key-value pairs.
    if (params) {
      Object.entries(params)
        .filter(([, value]) => value != null && value !== undefined)
        .forEach(([key, value]) => {
          if (
            typeof value === 'string' ||
            typeof value === 'number' ||
            typeof value === 'boolean'
          ) {
            httpParams = httpParams.append(key, value);
          } else if (value instanceof Date) {
            // Convert Date to ISO string before appending
            httpParams = httpParams.append(key, value.toISOString());
          }
        });
    }

    return httpParams;
  }
}
