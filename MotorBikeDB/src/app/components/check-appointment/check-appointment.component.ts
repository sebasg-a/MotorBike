import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitaService } from '../../services/cita.service';

@Component({
  selector: 'app-check-appointment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './check-appointment.component.html',
  styleUrl: './check-appointment.component.scss'
})
export class CheckAppointmentComponent implements OnInit {
  citas: any[] = [];
  cargando = true;

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    this.cargarCitas();
  }

  cargarCitas() {
    this.cargando = true;
    this.citaService.obtenerCitasConDetalles().subscribe({
      next: (citas) => {
        // ✅ Filtra solo las pendientes
        this.citas = citas.filter(c => c.estado_cita === 'pendiente');
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar citas:', err);
        this.cargando = false;
      }
    });
  }

  handleConfirmarCita(id: number) {
    this.citaService.confirmarCita(id).subscribe({
      next: (orden) => {
        console.log('Orden creada:', orden);
        alert('✅ Cita confirmada y orden de servicio creada.');
        // 🔄 Recargar citas pendientes
        this.cargarCitas();
      },
      error: (err) => {
        console.error('Error al confirmar cita:', err);
      }
    });
  }
}
