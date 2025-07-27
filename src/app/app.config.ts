import { ApplicationConfig, CUSTOM_ELEMENTS_SCHEMA, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling } from '@angular/router';
import { NgxStarsModule } from 'ngx-stars';

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { routes } from './app.routes';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from "ngx-spinner";
import { loadingInterceptor } from './shared/interceptors/loading.interceptor';
import { provideStore } from '@ngrx/store';
import { sortReducer } from './store/sort/sort.reducer';
import { provideEffects } from '@ngrx/effects';
import { sortEffects } from './store/sort/store.effects';
import { errorHandleInterceptor } from './shared/interceptors/error-handle.interceptor';
import { provideToastr, ToastrModule } from 'ngx-toastr';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation(), withInMemoryScrolling({
        scrollPositionRestoration: "enabled"
    })),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptors([loadingInterceptor,errorHandleInterceptor])),
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      NgxSpinnerModule,
      NgxStarsModule
    ),
  provideStore({
        sort: sortReducer
  }),
  provideEffects(sortEffects) ,
  provideAnimations(), // required animations providers
  provideToastr(), // Toastr providers

  ],

};
