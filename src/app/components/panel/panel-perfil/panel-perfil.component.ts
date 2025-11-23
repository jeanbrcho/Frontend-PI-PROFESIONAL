import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

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
  // Datos del profesional, cargados desde login/localStorage

  profesionalData = {
    name: '',
    lastname: '',
    dni: '',
    license: '',
    phone: '',
    email: ''
  };

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const profString = localStorage.getItem('user_profile');
    console.log('Perfil desde localStorage:', profString); // <- ver qué llega
    if (profString) {
      try {
        this.profesionalData = JSON.parse(profString);
      } catch (e) {
        console.error('Error parseando el perfil guardado:', e);
        // Inicializamos con valores vacíos para evitar errores en la UI
        this.profesionalData = {
          name: '',
          lastname: '',
          dni: '',
          license: '',
          phone: '',
          email: ''
        };
      }
    }
  }

  toggleEditMode(): void {
    this.isEditing = !this.isEditing;
  }

  guardarCambios(): void {
    localStorage.setItem('user_profile', JSON.stringify(this.profesionalData));
    this.toggleEditMode();
    alert('Cambios guardados localmente.');
  }
}