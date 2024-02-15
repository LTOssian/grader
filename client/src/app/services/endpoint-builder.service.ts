import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EndpointBuilderService {
  constructor() {}

  public buildEndpoint(
    routeOptions: { routeName: string; routeParam: string }[]
  ): string {
    const endpoint = routeOptions
      .map((routeInput) =>
        [routeInput.routeName, routeInput.routeParam].join('/')
      )
      .join('');

    return endpoint;
  }
}
