import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { IProfile } from '../interfaces/iprofile';


export interface LoginRequest {
  email: string;
  password: string;
}



export interface AuthResponse {
  status: string;
  message: string;
  data: {
    profesionalPayload: IProfile;
    token: string;
  };
}

interface IResponseProfile {
  status: string;
  message: string;
  data?: IProfile;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://btdyww2b6k.execute-api.us-east-1.amazonaws.com';
  private loginUrl = `${this.baseUrl}/auth/login/professional`;


  constructor(private http: HttpClient, private router: Router) { }


  login(credenciales: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.loginUrl, credenciales).pipe(
      tap(response => {
        this.saveToken(response?.data?.token ?? '');
        // Guardar usuario logueado en localStorage
        localStorage.setItem('user_profile', JSON.stringify(response?.data?.profesionalPayload ?? {}));
      })
    );
  }

  private saveToken(token: string): void {
    localStorage.setItem('auth_token', token);

  }


  isLoggedIn(): boolean {
    const token = localStorage.getItem('auth_token');
    return !!token;
  }


  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  userProfile(): Observable<IResponseProfile> {
    const urlProfile = `${this.baseUrl}/auth/profile`;
    console.log(localStorage.getItem('auth_token'))
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`, //el token se envía en el header
    };
    return this.http.get<IResponseProfile>(urlProfile, { headers });
  }

}