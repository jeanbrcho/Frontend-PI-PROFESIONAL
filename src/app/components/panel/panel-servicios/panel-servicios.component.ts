import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiciosService } from '../../../services/servicios.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-panel-servicios',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './panel-servicios.component.html',
  styleUrls: ['./panel-servicios.component.css']
})
export class PanelServiciosComponent implements OnInit {

  isEditing: boolean = false;

  serviciosData = {
    nombreEstablecimiento: '',
    biografia:'',
    street: '',
  streetNumber: '',
  neighborhood: '',
  province: '',
    direccion: '',
    especialidad: '',
    descripcion: '',
    precioBase: 0
  };

  private checkIdSubscription: Subscription | null = null;

  constructor(private serviciosService: ServiciosService) {}

  ngOnInit(): void {
    // Intentamos obtener el ID inmediatamente
    this.tryLoadServices();

    // Si no está, revisamos cada 500ms hasta que exista
    this.checkIdSubscription = interval(500).subscribe(() => {
      this.tryLoadServices();
    });
  }

  private tryLoadServices(): void {
    const professionalId = localStorage.getItem('professional_id');
    if (professionalId) {
      // Ya tenemos el ID, cargamos los servicios
      this.cargarServicios(professionalId);

      // Cancelamos la suscripción porque ya no necesitamos chequear más
      if (this.checkIdSubscription) {
        this.checkIdSubscription.unsubscribe();
        this.checkIdSubscription = null;
      }
    }
  }

 cargarServicios(id: string): void {
  this.serviciosService.getProfessionalWithServices(id).subscribe({
    next: (res) => {
      const profesional = res.data; // <-- acá está el objeto del profesional
      const srv = profesional.services?.[0];

      this.serviciosData = {
        nombreEstablecimiento: profesional.nameEstablishment || '',
        biografia: profesional.biography || '',
         street:  profesional.street || '',
        streetNumber:  profesional.streetNumber || '',
        neighborhood:  profesional.neighborhood || '',
        province:  profesional.province || '',
        direccion: `${profesional.street || ''} ${profesional.streetNumber || ''}, ${profesional.neighborhood || ''}, ${profesional.province || ''}`,
        especialidad: profesional.specialty || '',
        descripcion: srv?.description || profesional.biography || '',
        precioBase: srv?.price || 0
      };

      console.log('Servicios cargados:', this.serviciosData);
    },
    error: (error) => {
      console.error('Error al cargar servicios', error);
    }
  });
}

  toggleEditMode(): void {
    this.isEditing = !this.isEditing;
  }

  guardarCambios(): void {
    console.log("Guardando cambios:", this.serviciosData);
    // futuro PATCH con token
    this.toggleEditMode();
  }
}
