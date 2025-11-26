import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from "../../../models/User";
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NgIf,NgFor],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @ViewChild('form') form!: NgForm;

  // 🔹 Usuario solo con los campos que van al backend
  newUser: User = {
    email_usuario: '',
    uid_firebase: '',
    nombre_usuario: '',
    apellido_usuario: '',
    telefono_usuario: '',
    id_rol_usuario: 0
  };

  // 🔹 Campos solo para el formulario (no van al backend)
  password: string = '';
  confirmPassword: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  errorMessage: string = '';
  isLoading: boolean = false;

  // 🔹 Reglas de contraseña
  passwordRules = [
    { label: 'Al menos 6 caracteres', validator: () => this.password.length >= 6, color: '#d32f2f' },
    { label: 'Incluye mayúsculas', validator: () => /[A-Z]/.test(this.password), color: '#d32f2f' },
    { label: 'Incluye minúsculas', validator: () => /[a-z]/.test(this.password), color: '#d32f2f' },
    { label: 'Incluye números', validator: () => /[0-9]/.test(this.password), color: '#d32f2f' },
    { label: 'Incluye caracteres especiales', validator: () => /[!¡@#$%^&*(),.?":{}|<>]/.test(this.password), color: '#d32f2f' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async handleSubmit(): Promise<void> {
    if (this.form) {
      Object.keys(this.form.controls).forEach(key => {
        this.form.controls[key].markAsTouched();
      });
    }

    if (!this.validateForm()) return;

    this.isLoading = true;
    this.errorMessage = '';

    try {
      const fbUser = await this.authService.register(
        this.newUser.email_usuario,
        this.password,
        this.newUser
      );

      if (!fbUser || !fbUser.uid) {
        this.errorMessage = 'No se pudo obtener el UID de Firebase';
        return;
      }

      console.log('Usuario registrado correctamente:', fbUser.uid);
      this.router.navigate(['/invitado']);

    } catch (error: any) {
      this.errorMessage = this.getErrorMessage(error.code);
    } finally {
      this.isLoading = false;
    }
  }

  togglePasswordVisibility(field: 'password' | 'confirmPassword'): void {
    if (field === 'password') this.showPassword = !this.showPassword;
    else this.showConfirmPassword = !this.showConfirmPassword;
  }

  validatePasswordMatch(): boolean {
    return this.password === this.confirmPassword;
  }

  updatePasswordRuleColors(): void {
    this.passwordRules.forEach(rule => {
      rule.color = rule.validator() ? '#4CAF50' : '#d32f2f';
    });
  }

  private validateForm(): boolean {
    if (!this.validatePasswordMatch()) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return false;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres';
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(this.newUser.email_usuario)) {
      this.errorMessage = 'El formato del email no es válido';
      return false;
    }

    if (!this.newUser.nombre_usuario || !this.newUser.apellido_usuario) {
      this.errorMessage = 'Nombre y apellido son requeridos';
      return false;
    }

    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s']+$/;
    if (this.newUser.nombre_usuario && !nameRegex.test(this.newUser.nombre_usuario)) {
      this.errorMessage = 'El nombre solo puede contener letras y espacios';
      return false;
    }

    if (this.newUser.apellido_usuario && !nameRegex.test(this.newUser.apellido_usuario)) {
      this.errorMessage = 'El apellido solo puede contener letras y espacios';
      return false;
    }

    if (this.newUser.telefono_usuario) {
      const phoneRegex = /^[0-9]{7,15}$/;
      if (!phoneRegex.test(this.newUser.telefono_usuario)) {
        this.errorMessage = 'Teléfono no válido (solo números, 7-15 dígitos)';
        return false;
      }
    }

    return true;
  }

  private getErrorMessage(errorCode: string): string {
    const errorMessages: { [key: string]: string } = {
      'auth/email-already-in-use': 'El email ya está en uso',
      'auth/invalid-email': 'El formato del email no es válido',
      'auth/operation-not-allowed': 'Operación no permitida',
      'auth/weak-password': 'La contraseña es demasiado débil',
      'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde'
    };
    return errorMessages[errorCode] || 'Error al registrar el usuario';
  }
}
