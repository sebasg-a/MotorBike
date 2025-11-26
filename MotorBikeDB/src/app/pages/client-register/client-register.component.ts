import { Component, inject } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { CreateClientComponent } from '../../components/create-client/create-client.component';
import { CreateMotoComponent } from '../../components/create-moto/create-moto.component';
import { CreateMechanicComponent } from '../../components/create-mechanic/create-mechanic.component';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClientService } from '../../services/client.service';
import { MotoService } from '../../services/moto.service';

@Component({
  selector: 'app-client-register',
  imports: [
    NavBarComponent,
    CreateClientComponent,
    CreateMotoComponent,
    CreateMechanicComponent,
    NgIf,
    NgFor,
    FormsModule
  ],
  templateUrl: './client-register.component.html',
  styleUrl: './client-register.component.scss',
  standalone: true,
})
export class ClientRegisterComponent {
  showMechanicForm = false;
  showClientForm = true; // Mostrar cliente por defecto
  clienteSeleccionado: any = {};
  motoSeleccionada: any = {};
  clientes: any[] = [];

  clientService = inject(ClientService);
  motoService = inject(MotoService);

  ngOnInit() {
    this.cargarClientes();
  }

  toggleMechanicForm() {
    this.showMechanicForm = true;
    this.showClientForm = false;
  }

  toggleClientForm() {
    this.showClientForm = true;
    this.showMechanicForm = false;
  }

  cargarClientes() {
    this.clientService.getAllClientes().subscribe((data) => {
      this.clientes = data;
    });
  }

  handleSubmit() {
    console.log('Cliente a enviar:', this.clienteSeleccionado);
    console.log('Moto a enviar:', this.motoSeleccionada);

    this.clientService.createClienteConMoto(this.clienteSeleccionado, this.motoSeleccionada)
      .subscribe((response) => {
        console.log('Cliente creado:', response);
        this.clientes.push(response);
        alert('Cliente creado con moto correctamente');
        this.clienteSeleccionado = {};
        this.motoSeleccionada = {};
      });
  }

  handleAddMoto() {
    if (!this.clienteSeleccionado || !this.clienteSeleccionado.cedula_cliente) {
      alert('Debes seleccionar un cliente primero.');
      return;
    }

    console.log('Agregando moto a cliente:', this.clienteSeleccionado.cedula_cliente, this.motoSeleccionada);

    this.motoService.agregarMotoACliente(this.clienteSeleccionado.cedula_cliente, this.motoSeleccionada)
      .subscribe((nuevaMoto) => {
        console.log('Moto agregada:', nuevaMoto);
        alert('Moto agregada correctamente al cliente');
        this.motoSeleccionada = {};
      });
  }
}
