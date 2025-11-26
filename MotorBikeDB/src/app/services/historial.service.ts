import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Historial  from '../../models/Historial';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  readonly apiUrl = 'http://localhost:3000/api';


  constructor(private http: HttpClient) {}

  obtenerHistorialCompleto(): Observable<Historial[]> {
    return this.http.get<Historial[]>(`${this.apiUrl}/historial`);
  }

  registrarHistorialMantenimiento(id: number,historial: Historial): Observable<Historial> {
    return this.http.post<Historial>(`${this.apiUrl}/historial/${id}`, historial);
  }

registrarTrabajoMecanico(id: number, historial: Historial): Observable<Historial> {
  return this.http.post<Historial>(`${this.apiUrl}/historial/trabajo-mecanico/${id}`, historial);
}

finalizarMantenimiento(id: number, historial: Historial): Observable<Historial> {
  return this.http.post<Historial>(`${this.apiUrl}/ordenes/finalizar-mantenimiento/${id}`, historial);
}
}
