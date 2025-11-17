import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'; // Necesitamos DatePipe

// Interfaz para tipar los datos de un turno
interface Turno {
  id: number;
  fecha: Date; // Usamos un objeto Date
  servicio: string;
  cliente: string;
  mascota: string;
  telefono: string;
  estado:  'Confirmado' | 'Cancelado';
}

@Component({
  selector: 'app-panel-turnos',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './panel-turnos.component.html',
  styleUrl: './panel-turnos.component.css',
  providers: [DatePipe]
})


export class PanelTurnosComponent {
  
  // 🔑 Datos de ejemplo de turnos
  turnos: Turno[] = [
    { id: 101, fecha: new Date('2025-11-18T10:00:00'), servicio: 'Baño y Corte (Raza Pequeña)', cliente: 'María López', mascota: 'Pipo', telefono: '1155551234', estado: 'Confirmado' },
    { id: 102, fecha: new Date('2025-11-18T11:30:00'), servicio: 'Spa y Deslanado', cliente: 'Javier Díaz', mascota: 'Max', telefono: '1155555678', estado: 'Confirmado' },
    { id: 103, fecha: new Date('2025-11-19T09:00:00'), servicio: 'Corte de Uñas Express', cliente: 'Ana Gómez', mascota: 'Luna', telefono: '1155559012', estado: 'Confirmado' },
    { id: 104, fecha: new Date('2025-11-19T14:30:00'), servicio: 'Baño', cliente: 'Carlos Ruiz', mascota: 'Toby', telefono: '1155553456', estado: 'Confirmado' },
    { id: 105, fecha: new Date('2025-11-20T16:00:00'), servicio: 'Consulta Dermatológica', cliente: 'Laura Pérez', mascota: 'Simba', telefono: '1155557890', estado: 'Confirmado' },
  ];

  constructor(private datePipe: DatePipe) { }

  cancelarTurno(id: number): void {
    const turnoACancelar = this.turnos.find(t => t.id === id);

    if (turnoACancelar && turnoACancelar.estado !== 'Cancelado') {
      // ⚠️ Usar confirm() es una práctica rápida, idealmente usa un modal en Angular
      if (confirm(`¿Estás seguro de cancelar el turno de ${turnoACancelar.cliente} (${this.datePipe.transform(turnoACancelar.fecha, 'dd/MM HH:mm')})?`)) {
        
        // Aquí iría la llamada al servicio real (ej. this.agendaService.cancelar(id).subscribe(...))

        // Simulamos la cancelación:
        turnoACancelar.estado = 'Cancelado';
        console.log(`Turno ${id} cancelado.`);
        
        // Opcional: Si quieres quitarlo de la lista inmediatamente:
        // this.turnos = this.turnos.filter(t => t.id !== id);
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