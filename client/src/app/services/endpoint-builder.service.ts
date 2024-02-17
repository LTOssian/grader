import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EndpointBuilderService {
  constructor() {}

  public buildEndpoint(
    routeOptions: { routeName: string; routeParam: string }[]
  ): string {
    const endpoint =
      routeOptions.length > 1
        ? routeOptions
            .map((routeInput) =>
              [routeInput.routeName, routeInput.routeParam].join('/')
            )
            .join('/')
        : `/${routeOptions[0].routeName}/${routeOptions[0].routeParam}`;

    return endpoint;
  }
}
