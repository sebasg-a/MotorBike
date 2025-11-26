import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

import { OrdenService } from '../../services/orden.service';
import { HistorialService } from '../../services/historial.service';
import { CitaService } from '../../services/cita.service';
import { ServicioService } from '../../services/servicio.service';

@Component({
  selector: 'app-registrar-mantenimiento',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './registrar-mantenimiento.component.html',
  styleUrls: ['./registrar-mantenimiento.component.scss']
})
export class RegistrarMantenimientoComponent implements OnInit {
  ordenes: any[] = [];
  servicios: any[] = [];
  incluirCitaSeguimiento: boolean = false;
  mantenimiento = {
    id_orden: null as number | null,
    id_mecanico: null as number | null,
    descripcion: '',
    costo_final: null as number | null,
    observaciones: ''
  };

  mecanicoNombre = '';
  hoy = '';
  minDate = '';
  horasDisponibles: string[] = [];

  cita = {
    cedula_cliente: '',
    placa_moto: '',
    id_servicio: null as number | null,
    fecha: '',
    hora: '',
    fecha_cita: ''
  };

  constructor(
    private ordenService: OrdenService,
    private historialService: HistorialService,
    private citaService: CitaService,
    private servicioService: ServicioService
  ) {}

  ngOnInit() {
    const now = new Date();
    this.hoy = now.toISOString().split('T')[0];
    this.minDate = this.hoy;

    this.ordenService.obtenerOrdenes().subscribe((data) => {
      this.ordenes = data.filter(
        (o) => o.estado_orden === 'pendiente' && !o.observaciones_orden
      );
    });

    this.servicioService.obtenerServicios().subscribe((data) => {
      this.servicios = data;
    });

    this.horasDisponibles = this.generarHorasDisponibles(8, 18);
  }

  generarHorasDisponibles(inicio: number, fin: number): string[] {
    const horas: string[] = [];
    const now = new Date();
    const isToday = this.cita.fecha === this.hoy;

    for (let h = inicio; h <= fin; h++) {
      if (isToday && h <= now.getHours()) continue;
      horas.push(h.toString().padStart(2, '0') + ':00');
    }

    return horas;
  }

  onFechaChange() {
    const now = new Date();
    this.horasDisponibles = this.generarHorasDisponibles(8, 18);

    if (this.cita.fecha === this.hoy && now.getHours() >= 17) {
      alert('Ya no es posible agendar citas hoy. La hora límite fue las 17:00.');
      this.cita.hora = '';
      this.horasDisponibles = [];
    }
  }

  onOrdenSeleccionada() {
    this.mantenimiento.id_orden = Number(this.mantenimiento.id_orden);
    const orden = this.ordenes.find(o => o.id_orden === this.mantenimiento.id_orden);

    if (orden) {
      this.cita.cedula_cliente = orden.cedula_cliente;
      this.cita.placa_moto = orden.placa_moto;
      this.cita.id_servicio = orden.id_servicio;
      this.mantenimiento.id_mecanico = orden.id_mecanico;
      this.mecanicoNombre = `${orden.nombre_mecanico} ${orden.apellido_mecanico}`;
    } else {
      this.mecanicoNombre = '';
      this.mantenimiento.id_mecanico = null;
    }
  }

  registrarMantenimiento() {
    if (!this.mantenimiento.id_orden || !this.mantenimiento.id_mecanico) {
      alert('Debe seleccionar una orden válida.');
      return;
    }

    const fechaActual = new Date().toISOString();

    // 🔧 Datos para historial_servicios_mecanicos
    const trabajoMecanico = {
      id_mecanico: this.mantenimiento.id_mecanico,
      fecha_inicio_servicio: fechaActual,
      fecha_fin_servicio: fechaActual,
      descripcion_trabajo: this.mantenimiento.descripcion,
      detalles_adicionales: 'Trabajo mecánico iniciado.',
      fecha_historial: fechaActual,
      detalles_historial: `Inicio del mantenimiento: ${this.mantenimiento.descripcion}`
    };

    // 🔧 Datos para historial_mantenimientos
    const historialMantenimiento = {
      fecha_historial: fechaActual,
      detalles_historial: `Inicio del mantenimiento: ${this.mantenimiento.descripcion}`
    };

    // 1️⃣ Registrar trabajo del mecánico
    this.historialService.registrarTrabajoMecanico(this.mantenimiento.id_orden!, trabajoMecanico)
      .subscribe({
        next: () => {
          // 2️⃣ Registrar historial de mantenimiento
          this.historialService.registrarHistorialMantenimiento(this.mantenimiento.id_orden!, historialMantenimiento)
            .subscribe({
              next: () => {
                // 3️⃣ Cambiar estado de la orden
                this.ordenService.actualizarEstado(this.mantenimiento.id_orden!, 'en proceso')
                  .subscribe(() => {
                    alert('Mantenimiento iniciado correctamente.');
                  });
              },
              error: (err) => {
                console.error(err);
                alert('Error al registrar historial de mantenimiento.');
              }
            });
        },
        error: (err) => {
          console.error(err);
          alert('Error al registrar trabajo del mecánico.');
        }
      });
  }

  finalizarMantenimiento() {
    if (!this.mantenimiento.id_orden || !this.mantenimiento.id_mecanico || !this.mantenimiento.descripcion) {
      alert('Debe seleccionar una orden y llenar todos los campos.');
      return;
    }

    const historialFinal = {
      id_orden: this.mantenimiento.id_orden!,
      id_mecanico: this.mantenimiento.id_mecanico!,
      descripcion: this.mantenimiento.descripcion,
      costo_final: this.mantenimiento.costo_final,
      observaciones: this.mantenimiento.observaciones,
      fecha_historial: new Date().toISOString(),
      detalles_historial: `Finalización del mantenimiento: ${this.mantenimiento.descripcion}`
    };

    this.historialService.finalizarMantenimiento(this.mantenimiento.id_orden!, historialFinal)
      .subscribe({
        next: () => {
          alert('✅ Mantenimiento finalizado correctamente.');
          this.resetForm();
        },
        error: (err) => {
          console.error(err);
          alert('❌ Error al finalizar el mantenimiento.');
        }
      });
  }

  crearCitaSeguimiento() {
    this.cita.fecha_cita = `${this.cita.fecha}T${this.cita.hora}`;
    const fechaSeleccionada = new Date(this.cita.fecha_cita);

    if (fechaSeleccionada < new Date()) {
      alert('No puede agendar una cita en una fecha u hora pasada.');
      return;
    }

    const nuevaCita = {
      cedula_cliente: this.cita.cedula_cliente,
      placa_moto: this.cita.placa_moto,
      id_servicio: this.cita.id_servicio ?? 0,
      fecha_cita: this.cita.fecha_cita
    };

    this.citaService.crearCita(nuevaCita).subscribe({
      next: () => {
        alert('Mantenimiento y cita registrados correctamente.');
        this.resetForm();
      },
      error: (err) => {
        console.error(err);
        alert('El mantenimiento se registró, pero hubo un error al crear la cita.');
      },
    });
  }

  resetForm() {
    this.mantenimiento = {
      id_orden: null,
      id_mecanico: null,
      descripcion: '',
      costo_final: null,
      observaciones: ''
    };
    this.cita = { cedula_cliente: '', placa_moto: '', id_servicio: null, fecha: '', hora: '', fecha_cita: '' };
    this.mecanicoNombre = '';
  }
}
