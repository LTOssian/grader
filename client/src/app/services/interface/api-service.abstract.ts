import { environment } from '../../../environment/environment';
import { ErrorModel } from '../../interfaces/error-model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

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

  protected deleteEntityById<T>(
    entityId: string,
    params?: HttpParams
  ): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.apiBaseUrl}${this.apiEndpoint}/${entityId}`,
      { params }
    );
  }

  protected createEntityWithBody<T, R = T>(
    body: T,
    params?: HttpParams
  ): Observable<{ data: R } | ErrorModel> {
    return this.httpClient.post<{ data: R }>(
      `${environment.apiBaseUrl}${this.apiEndpoint}/`,
      body,
      { params }
    );
  }
}
