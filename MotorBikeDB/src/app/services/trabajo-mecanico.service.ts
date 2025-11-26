import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import TrabajoMecanico from '../../models/TrabajoMecanico';

@Injectable({
  providedIn: 'root'
})
export class TrabajoMecanicoService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  registrarTrabajoMecanico(trabajo: TrabajoMecanico): Observable<TrabajoMecanico> {
    return this.http.post<TrabajoMecanico>(`${this.apiUrl}/historia/trabajo-mecanico`, trabajo);
  }

  obtenerHistorialPorMecanico(id: number): Observable<TrabajoMecanico[]> {
  return this.http.get<TrabajoMecanico[]>(`${this.apiUrl}/historial/mecanico/${id}`);
}
}