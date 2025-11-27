import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'; // Necesitamos DatePipe
import { ShiftsService } from '../../../services/shifts.service';


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

  // Alerta personalizada
  showAlert = false;
  alertMessage = '';
  alertType: 'success' | 'error' = 'success';

  // Modal de confirmación personalizado
  showConfirmModal = false;
  confirmMessage = '';
  turnoToCancel: Turno | null = null;

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
      this.turnoToCancel = turnoACancelar;
      this.confirmMessage = `¿Estás seguro de cancelar el turno de ${turnoACancelar.cliente} (${this.datePipe.transform(turnoACancelar.fecha, 'dd/MM HH:mm')})?`;
      this.showConfirmModal = true;
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

  confirmCancelTurno() {
    if (!this.turnoToCancel || !this.professionalId) return;

    this.shiftsService.deleteShift(this.professionalId, String(this.turnoToCancel.id)).subscribe({
      next: () => {
        if (this.turnoToCancel) {
          this.turnoToCancel.estado = 'Cancelado';
          console.log(`Turno ${this.turnoToCancel.id} cancelado en backend.`);
          this.showCustomAlert('Turno cancelado exitosamente', 'success');
        }
        this.closeConfirmModal();
      },
      error: (err: any) => {
        console.error('Error cancelando turno', err);
        this.showCustomAlert('No se pudo cancelar el turno. Intenta nuevamente.', 'error');
        this.closeConfirmModal();
      }
    });
  }

  closeConfirmModal() {
    this.showConfirmModal = false;
    this.turnoToCancel = null;
    this.confirmMessage = '';
  }

  showCustomAlert(message: string, type: 'success' | 'error') {
    this.alertMessage = message;
    this.alertType = type;
    this.showAlert = true;
  }

  closeAlert() {
    this.showAlert = false;
    this.alertMessage = '';
  }
}