import { Component } from '@angular/core';
import { LoginComponent } from '../../components/login/login.component';
import { RegisterComponent } from '../../components/register/register.component';
import { NgClass} from '@angular/common';


@Component({
  selector: 'app-inicio',
  imports: [LoginComponent,RegisterComponent,NgClass],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {
  isLogin: boolean = true;

  toggleForm() {
    this.isLogin = !this.isLogin;
}
}
