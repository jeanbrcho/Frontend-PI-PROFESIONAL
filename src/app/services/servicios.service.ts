import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  private apiUrl = 'https://btdyww2b6k.execute-api.us-east-1.amazonaws.com/professionals';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token') || '';
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  // Obtener profesional con servicios
  getProfessionalWithServices(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/services`, { headers: this.getHeaders() });
  }

  // Crear un nuevo servicio
  createService(data: { idProfessional: string; name: string; description: string; price: number }): Observable<any> {
    // Aquí envías al backend el professionalId junto con los datos del servicio
    const routerService = 'https://btdyww2b6k.execute-api.us-east-1.amazonaws.com/services'
    return this.http.post(routerService, data, { headers: this.getHeaders() });
  }

  // Actualizar un servicio existente
  updateService(professionalId: string, serviceId: string, serviceData: { name: string; description: string; price: number }): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${professionalId}/services/${serviceId}`, serviceData, { headers: this.getHeaders() });
  }

  // Eliminar un servicio
  deleteService(professionalId: string, serviceId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${professionalId}/services/${serviceId}`, { headers: this.getHeaders() });
  }
}
