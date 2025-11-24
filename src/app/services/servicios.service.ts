import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  private apiUrl = 'https://btdyww2b6k.execute-api.us-east-1.amazonaws.com/professionals';

  constructor(private http: HttpClient) {}

  getProfessionalWithServices(id: string): Observable<any> {
    const token = localStorage.getItem('auth_token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/${id}/services`);
  }
}
