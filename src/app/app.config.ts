import { ApplicationConfig, CUSTOM_ELEMENTS_SCHEMA, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling } from '@angular/router';
import { NgxStarsModule } from 'ngx-stars';

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { routes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from "ngx-spinner";
import { loadingInterceptor } from './shared/interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes, withHashLocation(), withInMemoryScrolling({
    scrollPositionRestoration: "enabled"
  })),
  provideClientHydration(withEventReplay()),
  provideHttpClient(withFetch(),withInterceptors([loadingInterceptor])),
  importProvidersFrom(BrowserModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    NgxStarsModule)
  ],

};
