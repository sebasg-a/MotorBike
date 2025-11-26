import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CitaService } from '../../services/cita.service';
import Cita from '../../../models/Cita';
import { NgFor, NgIf } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-citas-recientes',
  templateUrl: './citas-recientes.component.html',
  imports: [NgFor, NgIf, DatePipe],
  styleUrls: ['./citas-recientes.component.scss']
})
export class CitasRecientesComponent implements OnInit {

   @Input() visible: boolean = false;   // control de visibilidad
  @Output() cerrar = new EventEmitter<void>(); // evento para notificar al padre

  citasHoy: Cita[] = [];
  citasManana: Cita[] = [];

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    this.cargarCitas();
  }

  cargarCitas(): void {
    this.citaService.obtenerCitasConDetalles().subscribe({
      next: (citas: Cita[]) => {
        const hoy = new Date();
        const manana = new Date();
        manana.setDate(hoy.getDate() + 1);

        const fechaHoy = hoy.toISOString().split('T')[0];
        const fechaManana = manana.toISOString().split('T')[0];

        this.citasHoy = citas.filter(c => c.fecha_cita.startsWith(fechaHoy));
        this.citasManana = citas.filter(c => c.fecha_cita.startsWith(fechaManana));
      },
      error: (err) => {
        console.error('Error al obtener citas:', err);
      }
    });
  }

  cerrarModal(): void {
    this.cerrar.emit();
  }
}