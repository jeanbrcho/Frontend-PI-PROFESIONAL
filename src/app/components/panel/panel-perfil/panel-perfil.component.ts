import { Component, OnInit } from '@angular/core'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

import { PerfilService } from '../../../services/perfil.service'; 
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-panel-perfil',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './panel-perfil.component.html',
  styleUrl: './panel-perfil.component.css'
})

export class PanelPerfilComponent implements OnInit { 

  isEditing: boolean = false;
  // Datos originales del profesional (para modo vista)
  profesionalData: any = {}; 
  // 🔑 CLAVE: Borrador de los datos (para modo edición en el HTML)
  profesionalDataDraft: any = {};
  
  isSaving: boolean = false; // Controla el estado del botón "Guardar"
  // 🔑 ESTADO: Aquí se guarda el mensaje de éxito o error para mostrarlo en el HTML
  message: string | null = null; 

  constructor(
    private authService: AuthService,
    private perfilService: PerfilService // 🔑 Inyectamos el servicio
  ) { }

ngOnInit(): void {
    const profString = localStorage.getItem('user_profile');
    if (profString) {
      try {
        this.profesionalData = JSON.parse(profString) || {};
      } catch (e) {
        console.error('Error parseando el perfil guardado:', e);
        this.profesionalData = {};
      }
    }
    // Inicializar el borrador como copia de los datos actuales al inicio
    this.profesionalDataDraft = { ...this.profesionalData };
  }

  toggleEditMode(): void {
    this.isEditing = !this.isEditing;
    this.message = null; // Limpiar mensaje al cambiar modo

    if (this.isEditing) {
      // Si entramos en modo edición, creamos una copia profunda de trabajo
      this.profesionalDataDraft = JSON.parse(JSON.stringify(this.profesionalData));
    } else {
      // Si CANCELAMOS, el borrador vuelve a tener los datos originales no guardados
      this.profesionalDataDraft = { ...this.profesionalData };
    }
  }

guardarCambios(): void {
    this.isSaving = true;
    this.message = null; 

    // Verificación de seguridad: necesitamos el ID para saber qué registro actualizar
    if (!this.profesionalDataDraft.id) {
        this.message = 'Error: Falta el ID del profesional para actualizar.';
        this.isSaving = false;
        return;
    }
    
    // 🔑 CLAVE: Llamada al servicio PerfilService (que usa la API)
    this.perfilService.updateProfile(this.profesionalDataDraft).subscribe({
        
        next: (respuesta) => {
            // Éxito: Sincronizar los datos originales con el borrador guardado
            this.profesionalData = this.profesionalDataDraft;
            // Guardar en localStorage para persistencia
            localStorage.setItem('user_profile', JSON.stringify(this.profesionalData));
            
            this.isSaving = false;
            this.isEditing = false; // Salir del modo edición
            this.message = '¡Perfil actualizado con éxito!'; // Mensaje de éxito
        },
        
        error: (err: HttpErrorResponse) => {
            // Error: Mostrar error detallado
            console.error('Error al guardar en la BD:', err);
            
            let errorText = 'Error desconocido al guardar los cambios.';
            if (err.status === 401) {
              errorText = 'No autorizado (401). El token falló o expiró. Por favor, vuelve a iniciar sesión.';
            } else if (err.error?.message) {
              errorText = err.error.message;
            }
            
            this.isSaving = false;
            this.message = `ERROR (${err.status}): ${errorText}`;
        }
    });
  }
}