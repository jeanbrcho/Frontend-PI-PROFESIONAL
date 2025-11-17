import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-panel-servicios',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './panel-servicios.component.html',
  styleUrl: './panel-servicios.component.css'
})


export class PanelServiciosComponent {
  
  isEditing: boolean = false; 

  // aca tambien hay que caargar los datos desde la base de datos, esto es re hardcodeado
  serviciosData = {
    especialidad: 'Peluquería Canina',
    horarioInicio: '09:00',
    horarioFin: '18:00',
    descripcion: 'Ofrezco servicios de baño, corte, y spa para razas pequeñas y medianas. Citas previas requeridas.',
    precioBase: 1500,
    domicilio: true
  };

  constructor() { }

  toggleEditMode(): void {
    this.isEditing = !this.isEditing;
    
    // if (!this.isEditing) { 
    //   this.cargarDatosOriginales(); 
    // }
  }

  guardarCambios(): void {
    
    console.log("Guardando cambios:", this.serviciosData);
    this.toggleEditMode(); 
  }
}