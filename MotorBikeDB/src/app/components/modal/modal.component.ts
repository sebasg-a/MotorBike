import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-modal',
  imports: [FormsModule, NgIf, NgClass],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() isOpen: boolean = false;
  @Output() closed = new EventEmitter<void>();

  close() {
    this.closed.emit();
  }

  email: string = '';
  message: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  async handleSubmit() {
    try {
      await this.authService.resetPassword(this.email);
      this.message = 'Se envió un correo con instrucciones para restablecer tu contraseña.';
      this.errorMessage = '';
    } catch (error: any) {
      this.errorMessage = 'No se pudo enviar el correo. Verifica que el email esté registrado.';
      this.message = '';
    }
  }

}
