import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-client',
  imports: [FormsModule],
  templateUrl: './create-client.component.html',
  styleUrl: './create-client.component.scss'
})
export class CreateClientComponent {
  @Output() clienteChange = new EventEmitter<any>();

  cliente = {
    cedula_cliente: '',
    nombre_cliente: '',
    apellido_cliente: '',
    email_cliente: '',
    telefono_cliente: '',
    fecha_registro_cliente: ''
  };
  
  ngOnInit() {
    this.emitChange();
  }

  emitChange() {
    this.clienteChange.emit(this.cliente);
  }
}
