import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {} 

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    // 1. Obtener el token de localStorage. Esto es lo que hiciste en tu AuthService.
    const authToken = localStorage.getItem('auth_token');

    // 2. Si el token existe y la URL no es la de login (para evitar un bucle o error)
    if (authToken && !request.url.includes('/auth/login')) {
      
      // CLAVE: Clonar la solicitud y añadir el encabezado 'Authorization: Bearer [token]'
      const cloned = request.clone({
        // Tu API espera el formato 'Bearer ' seguido del token
        headers: request.headers.set('Authorization', `Bearer ${authToken}`)
      });

      // 3. Enviar la solicitud CLONADA (la que ya tiene el token)
      return next.handle(cloned);
    }
    
    // Si no hay token o es la llamada de login, enviar la solicitud original
    return next.handle(request);
  }
}