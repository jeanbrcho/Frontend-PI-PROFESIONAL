import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService, LoginRequest } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  cargando: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  onLogin(): void {
    this.errorMessage = '';
    this.cargando = true;

    const credenciales: LoginRequest = {
      email: this.email,
      password: this.password
    };

    console.log('Intentando login con: ', credenciales);

    this.authService.login(credenciales).subscribe({
      next: (res) => {
        console.log('Respuesta login:', res);

        // Guardar token
        localStorage.setItem('auth_token', res.data.token);

        // Guardar perfil completo para el panel
        const perfilAGuardar = res.data.profesionalPayload;
        localStorage.setItem('user_profile', JSON.stringify(perfilAGuardar));

        // 🔑 Guardar ID del profesional para PanelServicios
        localStorage.setItem('professional_id', res.data.profesionalPayload.id);


        console.log('Perfil guardado:', perfilAGuardar);

        this.router.navigate(['/panel']);
        this.cargando = false;
      },

      error: (err) => {
        if (err.status === 401 || err.status === 403) {
          this.errorMessage = 'Credenciales inválidas. Verifica tu email y contraseña.';
        } else {
          this.errorMessage = 'Error de conexión con el servidor. Inténtalo de nuevo.';
        }
        this.cargando = false;
      }
    });
  }
}
