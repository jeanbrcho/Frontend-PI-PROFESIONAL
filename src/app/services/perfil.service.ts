// src/app/services/perfil.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const API_URL = 'https://btdyww2b6k.execute-api.us-east-1.amazonaws.com/professionals'; 


@Injectable({
  providedIn: 'root'
})
export class PerfilService {

 
  constructor(private http: HttpClient) { }

  /**
   * Envía los datos actualizados del perfil al servidor.
   * @param profileData Los datos del formulario (profesionalDataDraft)
   * @returns Un Observable con la respuesta del servidor
   */
  updateProfile(profileData: any): Observable<any> {

  const userId = profileData.id;

  // ⭐ Traer el token desde localStorage
  const token = localStorage.getItem('auth_token');

  return this.http.patch(
    `${API_URL}/${userId}/services`,
    profileData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}

    
  getProfessionalWithServices(id: string): Observable<any> {
  return this.http.get(`${API_URL}/${id}/services`);
}

}