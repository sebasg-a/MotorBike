import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Client from '../../models/Client';
import Moto from '../../models/Moto';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  readonly apiUrl = 'http://localhost:3000/api/clientes';

  constructor(private http: HttpClient) {}

  getAllClientes(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl);
  }

  getCliente(cedula: string): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/${cedula}`);
  }

  createClienteConMoto(cliente: Client, moto: Moto): Observable<Client> {
    const body = { clienteData: cliente, motoData: moto };
    return this.http.post<Client>(this.apiUrl, body);
  }

  updateCliente(cliente: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/${cliente.cedula}`, cliente);
  }

  deleteCliente(cedula: string): Observable<Client> {
    return this.http.delete<Client>(`${this.apiUrl}/${cedula}`);
  }
}