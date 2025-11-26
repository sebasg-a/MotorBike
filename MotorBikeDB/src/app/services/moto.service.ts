import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Moto from '../../models/Moto';

@Injectable({
  providedIn: 'root'
})
export class MotoService {
  private apiUrl = 'http://localhost:3000/api/motos'; // Cambia esto a la URL de tu API

  constructor(private http: HttpClient) {}

  obtenerMotos(): Observable<Moto[]> {
    return this.http.get<Moto[]>(this.apiUrl);
  }

  agregarMotoACliente(cedula: string, moto: Moto): Observable<Moto> {
  return this.http.post<Moto>(`${this.apiUrl}/cliente/${cedula}`, moto);
}

  obtenerMotoPorPlaca(placa: string): Observable<Moto> {
    return this.http.get<Moto>(`${this.apiUrl}/${placa}`);
  }
  crearMoto(moto: Moto): Observable<Moto> {
    return this.http.post<Moto>(this.apiUrl, moto);
  }
  actualizarMoto(placa: string, moto: Moto): Observable<Moto> {
    return this.http.put<Moto>(`${this.apiUrl}/${placa}`, moto);
  }
  eliminarMoto(placa: string): Observable<Moto> {
    return this.http.delete<Moto>(`${this.apiUrl}/${placa}`);
  }
  obtenerMotosPorCliente(cedula: string): Observable<Moto[]> {
    return this.http.get<Moto[]>(`${this.apiUrl}/cliente/${cedula}`);
  }
}
