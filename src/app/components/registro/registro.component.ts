import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  form!: FormGroup; // 🔹 Se declara, pero no se inicializa aún
  specialties = ['Veterinaria', 'Peluqueria'];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), this.noNumbersValidator()]],
    lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), this.noNumbersValidator()]],
    dni: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(10), this.onlyNumbersValidator()]],
    phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15), this.onlyNumbersValidator()]],
    license: ['', [Validators.required]],
    specialty: ['', [Validators.required]],
    nameEstablishment: ['', [Validators.required]],
    street: ['', [Validators.required]],
    streetNumber: ['', [Validators.required]],
    neighborhood: ['', [Validators.required]],
    province: ['', [Validators.required]],
    postalCode: ['', [Validators.required]],
    location: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: this.passwordsMatchValidator() });

  }

  // ❌ No permite números
  noNumbersValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const val = control.value as string;
      if (!val) return null;
      return /\d/.test(val) ? { hasNumber: true } : null;
    };
  }

  // ✅ Solo números permitidos
  onlyNumbersValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const val = control.value as string;
      if (!val) return null;
      return /^\d+$/.test(val) ? null : { notOnlyNumbers: true };
    };
  }

  // 🔒 Contraseñas iguales
  passwordsMatchValidator(): ValidatorFn {
    return (group: AbstractControl) => {
      const pw = group.get('password')?.value;
      const cpw = group.get('confirmPassword')?.value;
      return pw && cpw && pw !== cpw ? { passwordsMismatch: true } : null;
    };
  }

  control(name: string) {
    return this.form.get(name)!;
  }

  isValid(name: string) {
    const c = this.control(name);
    return c && c.valid && (c.dirty || c.touched);
  }

  isInvalid(name: string) {
    const c = this.control(name);
    return c && c.invalid && (c.dirty || c.touched);
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = { ...this.form.value };
    delete (payload as any).confirmPassword;

    console.log('payload de registro (listo para enviar):', payload);
  }
  onKeyPressLettersOnly(event: KeyboardEvent) {
    const char = event.key;
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
    if (!regex.test(char)) {
      event.preventDefault();
    }
  }

  onKeyPressNumbersOnly(event: KeyboardEvent) {
    const char = event.key;
    if (!/^[0-9]$/.test(char)) {
      event.preventDefault();
    }
  }

}
