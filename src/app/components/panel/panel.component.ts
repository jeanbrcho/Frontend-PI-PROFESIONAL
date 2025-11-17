import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent {

  onLogoutClick() {
    // Lógica para cerrar sesión, como limpiar tokens, redirigir, etc.
    console.log('Cerrando sesión...');
  } 

}
