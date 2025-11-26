import { Component } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { HistorialMantenimientoComponent } from '../../components/historial-mantenimiento/historial-mantenimiento.component';
import { HistorialPorMecanicoComponent } from '../../components/historial-por-mecanico/historial-por-mecanico.component';
import { InformesService } from '../../services/informes.service';
import { MotoService } from '../../services/moto.service';
import { MecanicoService } from '../../services/mecanico.service';

@Component({
  selector: 'app-historial',
  imports: [NavBarComponent,HistorialMantenimientoComponent,HistorialPorMecanicoComponent],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.scss'
})
export class HistorialComponent {

  constructor(private informesService: InformesService,
    private motoService: MotoService,
    private mecanicoService: MecanicoService
  ) {}

  generarPDFMotos() {
    
    // 1. Llamar a la BD
    this.motoService.obtenerMotos().subscribe(
      motos => {

        if (!motos || motos.length === 0) {
          alert("No hay motos registradas.");
          return;
        }

        // 2. Enviar los datos reales al servicio del PDF
        this.informesService.generarInformeMotos(motos);

      },
      error => {
        console.error("Error obteniendo motos:", error);
        alert("Error al obtener datos de las motos");
      }
    );
  }


  generarPDFTrabajador() {

    this.mecanicoService.obtenerMecanicos().subscribe(
      mecanicos => {
  
        if (!mecanicos || mecanicos.length === 0) {
          alert("No hay mecánicos registrados.");
          return;
        }
  
        // Aquí enviamos TODOS los mecánicos al PDF
        this.informesService.generarInformeTrabajador(mecanicos);
  
      },
      error => {
        console.error("Error obteniendo mecánicos:", error);
        alert("Error al obtener los datos de los mecánicos.");
      }
    );
  }
  
  
  

  
}
