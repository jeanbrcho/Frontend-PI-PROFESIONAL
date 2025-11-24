import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent {

   constructor(private router: Router) {}
  onLogoutClick() {
   
    // Borrar todo lo relacionado al usuario
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_profile');
    localStorage.removeItem('professional_id');
    
    

    // Redirigir al login
    this.router.navigate(['/']);
  
    console.log('Cerrando sesión...');
  } 

}
