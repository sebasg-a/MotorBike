import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ClientRegisterComponent } from './pages/client-register/client-register.component';
import { AppointmentComponent } from './pages/appointment/appointment.component';
import { HistorialComponent } from './pages/historial/historial.component';
import { AuthGuard } from './guards/auth.guard';
import { InvitadosComponent } from './pages/invitados/invitados.component';
import { TrabajosComponent } from './pages/trabajos/trabajos.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { 
    path: 'client-register', 
    component: ClientRegisterComponent, 
    canActivate: [AuthGuard], 
    data: { roles: [1] } 
  },
  { 
    path: 'invitado',
    component: InvitadosComponent,
    canActivate: [AuthGuard],
    data: { roles: [0] }
  },
  { 
    path: 'turnos', 
    component: AppointmentComponent, 
    canActivate: [AuthGuard], 
    data: { roles: [1] } 
  },
  { 
    path: 'historial', 
    component: HistorialComponent, 
    canActivate: [AuthGuard], 
    data: { roles: [1] } 
  },
  {
    path: 'trabajos',
    component: TrabajosComponent,
    canActivate: [AuthGuard],
    data: { roles: [1] }
  }
];
