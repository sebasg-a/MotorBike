import { Component } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { HistorialMantenimientoComponent } from '../../components/historial-mantenimiento/historial-mantenimiento.component';
import { HistorialPorMecanicoComponent } from '../../components/historial-por-mecanico/historial-por-mecanico.component';
import { InformesService } from '../../services/informes.service';

@Component({
  selector: 'app-historial',
  imports: [NavBarComponent,HistorialMantenimientoComponent,HistorialPorMecanicoComponent],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.scss'
})
export class HistorialComponent {

  constructor(private informesService: InformesService) {}

  generarPDFMotos() {
    const motoDemo = {
      placa: "ABC123",
      marca: "Yamaha",
      modelo: "FZ16",
      kilometraje: 23400,
      cliente: "Juan Pérez",
      servicios: [
        { fecha: "2024-07-01", descripcion: "Cambio de aceite" },
        { fecha: "2024-07-15", descripcion: "Revisión general" }
      ]
    };

    this.informesService.generarInformeMotos(motoDemo);
  }

  generarPDFTrabajador() {
    const dataTrabajadorDemo = {
      nombre: "Carlos López",
      cedula: "123456789",
      servicios: [
        { fecha: "2024-08-01", descripcion: "Cambio de aceite - Moto ABC123" },
        { fecha: "2024-08-10", descripcion: "Sincronización - Moto XYZ987" }
      ]
    };

    this.informesService.generarInformeTrabajador(dataTrabajadorDemo);
  }
}
