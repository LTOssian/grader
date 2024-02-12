import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable()
export abstract class ApiServiceMaker {
  protected abstract apiEndpoint: string;
  protected httpClient = inject(HttpClient);

  protected getAllEntities<T>(params?: HttpParams): Observable<{ data: T }> {
    const results = this.httpClient.get<{ data: T }>(
      `${environment.apiBaseUrl}${this.apiEndpoint}`,
      { params }
    );

    return results;
  }
}
