import { Component, OnInit } from '@angular/core';
import { HistorialService } from '../../services/historial.service';
import Historial from '../../../models/Historial';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-historial-mantenimiento',
  imports: [NgFor, NgIf, FormsModule,DatePipe],
  standalone: true,
  templateUrl: './historial-mantenimiento.component.html',
  styleUrl: './historial-mantenimiento.component.scss'
})
export class HistorialMantenimientoComponent implements OnInit {
  historiales: Historial[] = [];
  paginatedHistoriales: Historial[] = [];
  filteredHistoriales: Historial[] = [];

  pageSize: number = 5;
  currentPage: number = 1;
  searchTerm: string = ''; // 🔍 Campo para la búsqueda

  constructor(private historialService: HistorialService) {}

  ngOnInit(): void {
    this.cargarHistorial();
  }

  cargarHistorial() {
    this.historialService.obtenerHistorialCompleto().subscribe(
      historiales => {
        this.historiales = historiales;
        this.filteredHistoriales = historiales; // Inicialmente todos
        this.updatePaginatedHistoriales();
      },
      error => {
        console.error('Error al cargar el historial:', error);
        alert('Error al cargar el historial. Por favor, inténtelo de nuevo más tarde.');
      }
    );
  }

  // 🔍 Filtrar resultados según el término de búsqueda
  filtrarHistorial() {
    const term = this.searchTerm.trim().toLowerCase();

    if (!term) {
      this.filteredHistoriales = this.historiales;
    } else {
      this.filteredHistoriales = this.historiales.filter(historial =>
        Object.values(historial).some(value =>
          value &&
          value.toString().toLowerCase().includes(term)
        )
      );
    }

    this.currentPage = 1;
    this.updatePaginatedHistoriales();
  }

  updatePaginatedHistoriales() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedHistoriales = this.filteredHistoriales.slice(startIndex, endIndex);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedHistoriales();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedHistoriales();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.filteredHistoriales.length / this.pageSize);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedHistoriales();
  }
}
