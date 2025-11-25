import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_BASE = 'https://btdyww2b6k.execute-api.us-east-1.amazonaws.com';

@Injectable({
  providedIn: 'root'
})
export class ShiftsService {

  constructor(private http: HttpClient) { }

  /**
   * Obtiene los turnos de un profesional
   * @param professionalId id del profesional
   */
  getShifts(professionalId: string): Observable<any> {
    const token = localStorage.getItem('auth_token');
    return this.http.get(`${API_BASE}/shifts/professional/${professionalId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  /**
   * Cancela un turno del profesional
   * @param professionalId id del profesional
   * @param shiftId id del turno a cancelar
   */
  cancelShift(professionalId: string, shiftId: string): Observable<any> {
    const token = localStorage.getItem('auth_token');
    return this.http.delete(`${API_BASE}/shifts/${shiftId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}