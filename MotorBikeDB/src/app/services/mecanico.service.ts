import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Mecanico from '../../models/Mecanico';

@Injectable({
  providedIn: 'root'
})

export class MecanicoService {

  readonly apiUrl = 'http://localhost:3000/api';

constructor(private http: HttpClient) {}
  
crearMecanico(mecanico: Mecanico): Observable<Mecanico> {
    return this.http.post<Mecanico>(`${this.apiUrl}/mecanicos`, mecanico);
  }

  obtenerMecanicos(): Observable<Mecanico[]> {
    return this.http.get<Mecanico[]>(`${this.apiUrl}/mecanicos`);
  }

  eliminarMecanico(nombre_mecanico: string): Observable<Mecanico> {
    return this.http.delete<Mecanico>(`${this.apiUrl}/mecanicos/${nombre_mecanico}`);
  }

  actualizarMecanico(mecanico: Mecanico): Observable<Mecanico> {
    return this.http.put<Mecanico>(`${this.apiUrl}/mecanicos/${mecanico.nombre_mecanico}`, mecanico);
  }

  asignarMecanico(id_mecanico: number, id_orden: number): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/mecanicos/ordenes/asignar`, {
    id_mecanico,
    id_orden
  });
}
}
