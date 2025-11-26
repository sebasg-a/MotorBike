import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import TrabajoMecanico from '../../../models/TrabajoMecanico';
import { TrabajoMecanicoService } from '../../services/trabajo-mecanico.service';
import { MecanicoService } from '../../services/mecanico.service'; // 👈 servicio para obtener mecánicos



@Component({
  selector: 'app-historial-por-mecanico',
  imports: [NgFor, NgIf, FormsModule],
  standalone: true,
  templateUrl: './historial-por-mecanico.component.html',
  styleUrl: './historial-por-mecanico.component.scss'
})
export class HistorialPorMecanicoComponent implements OnInit {
  idMecanico: number | null = null;
  trabajos: TrabajoMecanico[] = [];
  buscado: boolean = false;

  mecanicos: any[] = []; // Lista de mecánicos disponibles

  constructor(
    private trabajoService: TrabajoMecanicoService,
    private mecanicoService: MecanicoService
    
  ) {}

  ngOnInit() {
    // 👇 cargar todos los mecánicos cuando se monta el componente
    this.mecanicoService.obtenerMecanicos().subscribe({
      next: (data) => {
        this.mecanicos = data;
      },
      error: (err) => {
        console.error('Error cargando mecánicos:', err);
      }
    });
  }

  

  buscarHistorialPorMecanico() {
    if (this.idMecanico === null) {
      alert('Por favor, seleccione un mecánico.');
      return;
    }

    this.trabajoService.obtenerHistorialPorMecanico(this.idMecanico).subscribe({
      next: (trabajos) => {
        this.trabajos = trabajos;
        this.buscado = true;
      },
      error: (error) => {
        console.error('Error al obtener trabajos:', error);
        alert('Error al obtener el historial. Intente nuevamente.');
        this.trabajos = [];
        this.buscado = true;
      }
    });
  }
}
