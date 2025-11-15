import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panel-perfil',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './panel-perfil.component.html',
  styleUrl: './panel-perfil.component.css'
})


export class PanelPerfilComponent {
  // 🔑 CLAVE: Variable para controlar el estado
  isEditing: boolean = false; 

  // Variables para almacenar los datos (que luego cargarías del servicio)
  profesionalData = {
    name: 'María',
    lastname: 'Gómez',
    dni: '38999888',
    license: 'LIC-12345',
    phone: '+54 9 11 5555-2222',
    email: 'maria.gomez@vetstyle.com'
  };

  constructor() { }

  toggleEditMode(): void {
    this.isEditing = !this.isEditing;
  }
}