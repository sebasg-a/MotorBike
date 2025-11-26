import { Component } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { RegistrarMantenimientoComponent } from '../../components/registrar-mantenimiento/registrar-mantenimiento.component';





@Component({
  selector: 'app-trabajos',
  imports: [NavBarComponent, RegistrarMantenimientoComponent],
  templateUrl: './trabajos.component.html',
  styleUrl: './trabajos.component.scss'
})
export class TrabajosComponent {

}
