import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'; // Necesitamos DatePipe
import { ShiftsService } from '../../../services/shifts.service';
//import { PerfilService } from '../../../services/perfil.service'; // antiguo (comentado)

// Interfaz para tipar los datos de un turno
interface Turno {
  id: string | number;
  fecha: Date; // Usamos un objeto Date
  servicio: string;
  cliente: string;
  mascota: string;
  telefono: string;
  estado:  'Confirmado' | 'Cancelado' | string;
}

@Component({
  selector: 'app-panel-turnos',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './panel-turnos.component.html',
  styleUrl: './panel-turnos.component.css',
  providers: [DatePipe]
})


export class PanelTurnosComponent implements OnInit {

  turnos: Turno[] = [];
  professionalId: string | null = null;

  // Constructor antiguo (comentado):
  // constructor(private datePipe: DatePipe, private perfilService: PerfilService) { }

  // Nuevo constructor usando ShiftsService
  constructor(private datePipe: DatePipe, private shiftsService: ShiftsService) { }

  ngOnInit(): void {
    // Intentar obtener el id del profesional desde el perfil guardado
    try {
      const profile = JSON.parse(localStorage.getItem('user_profile') || 'null');
      this.professionalId = profile?.id ?? null;
    } catch (e) {
      this.professionalId = null;
    }

    if (this.professionalId) {
      this.loadShifts();
    } else {
      console.warn('No se encontró professionalId en localStorage (user_profile)');
    }
  }

  private loadShifts(): void {
    if (!this.professionalId) return;
    // Código antiguo usando PerfilService (comentado):
    // this.perfilService.getShifts(this.professionalId).subscribe({
    //   next: (res: any) => {
    //     const raw = res?.data ?? res;
    //     if (!Array.isArray(raw)) { this.turnos = []; return; }
    //     this.turnos = raw.map((s: any) => ({
    //       id: s.id ?? s._id ?? s.shiftId ?? s.shift_id,
    //       fecha: s.date ? new Date(s.date) : (s.fecha ? new Date(s.fecha) : new Date()),
    //       servicio: s.serviceName ?? s.servicio ?? s.service ?? 'Servicio',
    //       cliente: (s.clientName ?? s.cliente ?? `${s.client?.name ?? ''} ${s.client?.lastname ?? ''}`.trim()) || 'Cliente',
    //       mascota: s.petName ?? s.mascota ?? s.pet ?? '',
    //       telefono: s.phone ?? s.telefono ?? s.client?.phone ?? '',
    //       estado: s.status ?? s.estado ?? 'Confirmado'
    //     }));
    //   },
    //   error: (err: any) => { console.error('Error cargando turnos', err); }
    // });

    // Nuevo: usar ShiftsService
    this.shiftsService.getShifts(this.professionalId).subscribe({
      next: (res: any) => {
        const raw = res?.data ?? res;
        if (!Array.isArray(raw)) { this.turnos = []; return; }
        this.turnos = raw.map((s: any) => ({
          id: s.id,
          fecha: s.date && s.time ? new Date(`${s.date}T${s.time}`) : new Date(),
          servicio: s.service?.name ?? 'Servicio',
          cliente: `${s.user?.name ?? ''} ${s.user?.lastname ?? ''}`.trim() || 'Cliente',
          mascota: s.petname ?? '',
          telefono: s.phone ?? '',
          estado: s.status ?? 'Confirmado' 
        }));
      },
      error: (err: any) => { console.error('Error cargando turnos', err); }
    });
  }

  cancelarTurno(id: string | number): void {
    const turnoACancelar = this.turnos.find(t => t.id === id);

    if (!this.professionalId) {
      console.error('No professionalId disponible para cancelar turno');
      return;
    }

    if (turnoACancelar && turnoACancelar.estado !== 'Cancelado') {
      if (confirm(`¿Estás seguro de cancelar el turno de ${turnoACancelar.cliente} (${this.datePipe.transform(turnoACancelar.fecha, 'dd/MM HH:mm')})?`)) {
        // Código antiguo usando PerfilService (comentado):
        // this.perfilService.cancelShift(this.professionalId, String(id)).subscribe({
        //   next: () => { turnoACancelar.estado = 'Cancelado'; console.log(`Turno ${id} cancelado en backend.`); },
        //   error: (err: any) => { console.error('Error cancelando turno', err); alert('No se pudo cancelar el turno. Intenta nuevamente.'); }
        // });

        // Nuevo: usar ShiftsService
        this.shiftsService.cancelShift(this.professionalId, String(id)).subscribe({
          next: () => {
            // Actualizar estado en UI
            turnoACancelar.estado = 'Cancelado';
            console.log(`Turno ${id} cancelado en backend.`);
          },
          error: (err: any) => {
            console.error('Error cancelando turno', err);
            alert('No se pudo cancelar el turno. Intenta nuevamente.');
          }
        });
      }
    }
  }

  // Helper para obtener el nombre de la clase CSS según el estado
  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'Confirmado':
        return 'status-confirmado';
      case 'Cancelado':
        return 'status-cancelado';
      default:
        return '';
    }
  }
}