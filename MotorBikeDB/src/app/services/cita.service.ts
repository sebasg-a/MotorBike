import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Cita from '../../models/Cita';

@Injectable({
  providedIn: 'root'
})

export class CitaService {
  private apiUrl = 'http://localhost:3000/api'; // Modificamos la apiUrl base
  constructor(private http: HttpClient) { }

  crearCita(cita: Cita): Observable<Cita> {
    return this.http.post<Cita>(`${this.apiUrl}/citas`, cita); // Usamos la apiUrl base y añadimos /citas
  }

  obtenerCitasConDetalles(): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.apiUrl}/citas/detalles`); // Usamos la apiUrl base y añadimos /citas/detalles
  }

  confirmarCita(id: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/citas/${id}/confirmar`, {}); // Usamos la apiUrl base y añadimos /citas/:id
  }

  getCitasPorHora(hora: string): Observable<Cita[]> {
  return this.http.get<Cita[]>(`${this.apiUrl}/citas/hora/${hora}`);
}
}