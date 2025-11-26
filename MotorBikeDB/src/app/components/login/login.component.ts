import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ModalComponent } from '../modal/modal.component';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, ModalComponent, CommonModule, FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  errorMessage: string = '';
  isModalOpen = false; 
  forgotEmail = '';

  // 🔹 Variables para bloqueo
  intentosFallidos: number = 0;
  maxIntentos: number = 5;
  cuentaBloqueada: boolean = false;

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid && !this.cuentaBloqueada) {
      const { email, password } = this.loginForm.value;

      try {
        const firebaseUser = await this.authService.login(email!, password!);

        if (!firebaseUser) throw new Error('No se pudo iniciar sesión');

        const usuario = await this.authService.getUsuarioByUid(firebaseUser.uid).toPromise();

        if (!usuario) throw new Error('Usuario no encontrado en backend');

        localStorage.setItem('usuario', JSON.stringify(usuario));

        switch (usuario.id_rol_usuario) {
          case 1:
            this.router.navigate(['/client-register']);
            break;
          case 0: 
            this.router.navigate(['/turnos']);
            break;
          default:
            this.router.navigate(['/']); 
        }

        // ✅ Reiniciar intentos si inicia sesión correctamente
        this.intentosFallidos = 0;

      } catch (error: any) {
        console.error(error);
        this.errorMessage = this.getErrorMessage(error.code || error.message);

        // 🚨 Contador de intentos fallidos
        this.intentosFallidos++;
        if (this.intentosFallidos >= this.maxIntentos) {
          this.cuentaBloqueada = true;
          this.loginForm.controls['password'].disable();
          this.errorMessage = 'Cuenta bloqueada por demasiados intentos. Intenta más tarde.';

          // 🔓 (Opcional) desbloqueo automático tras 30 segundos
          setTimeout(() => {
            this.cuentaBloqueada = false;
            this.loginForm.controls['password'].enable();
            this.intentosFallidos = 0;
          }, 30000);
        }
      }
    }
  }

  private getErrorMessage(errorCode: string): string {
    const errorMessages: { [key: string]: string } = {
      'auth/user-not-found': 'Usuario no encontrado',
      'auth/wrong-password': 'Contraseña incorrecta',
      'auth/invalid-email': 'Email inválido',
      'auth/invalid-credential': 'Credenciales inválidas',
      'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde',
      'No se pudo iniciar sesión': 'No se pudo iniciar sesión con Firebase',
      'Usuario no encontrado en backend': 'Usuario no registrado en el sistema'
    };

    return errorMessages[errorCode] || 'Error al iniciar sesión';
  }

  // Modal recuperación de contraseña
  openForgotPasswordModal(event: Event): void {
    event.preventDefault();
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.forgotEmail = '';
  }

  async sendResetEmail() {
    if (!this.forgotEmail) return;

    try {
      await this.authService.resetPassword(this.forgotEmail);
      alert('Se envió un correo de recuperación a ' + this.forgotEmail);
      this.closeModal();
    } catch (error) {
      alert('Error al enviar correo. Verifica que el email esté registrado.');
    }
  }
}
