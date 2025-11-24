import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
// 🔑 Importaciones existentes:
import { provideHttpClient } from '@angular/common/http';
// 🔑 NUEVO: Importaciones para el Interceptor
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor.service'; // Asumiendo que está en 'services'


export const appConfig: ApplicationConfig = {
  providers: [
    // Proveedores existentes
    provideHttpClient(), 
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    
    // 🔑 NUEVO: Registro del Interceptor
    // Esto es lo que le dice a Angular que use tu clase AuthInterceptor para añadir el token a todas las solicitudes.
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
};