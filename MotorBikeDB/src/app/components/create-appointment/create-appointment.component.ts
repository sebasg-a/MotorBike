import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { MotoService } from '../../services/moto.service';
import { ServicioService } from '../../services/servicio.service'; 
import { CitaService } from '../../services/cita.service';

@Component({
  selector: 'app-create-appointment',
  imports: [NgFor, FormsModule],
  templateUrl: './create-appointment.component.html',
  styleUrl: './create-appointment.component.scss',
  standalone: true
})
export class CreateAppointmentComponent implements OnInit {
  clientes: any[] = [];
  servicios: any[] = [];
  motosClienteSeleccionado: any[] = [];

  horasDisponibles: string[] = [];

  // Variables para limitar fecha
  minDate: string = '';
  hoy: string = '';

  cita = {
    cedula_cliente: '',
    placa_moto: '',
    id_servicio: null,
    fecha: '',
    hora: '',
    fecha_Cita: '' 
  };

  constructor(
    private clientesService: ClientService,
    private motosService: MotoService,
    private serviciosService: ServicioService, 
    private citaService: CitaService
  ) {}

  ngOnInit() {
    const now = new Date();
    this.hoy = now.toISOString().split('T')[0];
    this.minDate = this.hoy;

    this.clientesService.getAllClientes().subscribe(clientes => {
      this.clientes = clientes;
    });

    this.serviciosService.obtenerServicios().subscribe(servicios => {
      this.servicios = servicios;
    });

    this.horasDisponibles = this.generarHorasDisponibles(8, 18);
  }

  generarHorasDisponibles(inicio: number, fin: number): string[] {
    const horas: string[] = [];
    const now = new Date();
    const isToday = this.cita.fecha === this.hoy;

    for (let h = inicio; h <= fin; h++) {
      if (isToday && h <= now.getHours()) continue; // omitir horas pasadas
      horas.push(h.toString().padStart(2, '0') + ':00');
    }

    return horas;
  }

  onFechaChange() {
    this.horasDisponibles = this.generarHorasDisponibles(8, 18);

    // Bloqueo después de las 17
    const now = new Date();
    if (this.cita.fecha === this.hoy && now.getHours() >= 17) {
      alert('Ya no es posible agendar citas hoy, la hora límite fue las 17:00.');
      this.cita.hora = '';
      this.horasDisponibles = [];
    }
  }

  filtrarMotos(cedula: string) {
    this.motosService.obtenerMotosPorCliente(cedula).subscribe(motos => {
      this.motosClienteSeleccionado = motos;
      this.cita.placa_moto = '';
    });
  }

  resetForm() {
    this.cita = {
      cedula_cliente: '',
      placa_moto: '',
      id_servicio: null,
      fecha: '',
      hora: '',
      fecha_Cita: '' 
    };
    this.motosClienteSeleccionado = [];
    this.horasDisponibles = this.generarHorasDisponibles(8, 18);
  }

  handleSubmit() {
    if (this.cita.id_servicio === null || isNaN(this.cita.id_servicio)) {
      alert('Debe seleccionar un servicio antes de continuar.');
      return;
    }

    this.cita.fecha_Cita = `${this.cita.fecha}T${this.cita.hora}`;

    const fechaSeleccionada = new Date(this.cita.fecha_Cita);
    if (fechaSeleccionada < new Date()) {
      alert('No puede seleccionar una fecha u hora pasada.');
      return;
    }

    const turnoFinal = {
      cedula_cliente: this.cita.cedula_cliente,
      placa_moto: this.cita.placa_moto,
      id_servicio: this.cita.id_servicio,
      fecha_cita: this.cita.fecha_Cita
    };

    console.log('Turno a guardar:', turnoFinal);

    this.citaService.crearCita(turnoFinal).subscribe(
      response => {
        console.log('Cita creada:', response);
        alert('Cita creada con éxito!');
        this.resetForm();
      },
      error => {
        console.error('Error al crear la cita:', error);
        alert('Ocurrió un error al crear la cita.');
      }
    );
  }
}