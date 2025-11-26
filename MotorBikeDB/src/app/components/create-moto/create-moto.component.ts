import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-moto',
  imports: [FormsModule],
  templateUrl: './create-moto.component.html',
  styleUrl: './create-moto.component.scss'
})
export class CreateMotoComponent {
  @Output() motoChange = new EventEmitter<any>();

  moto = {
    marca_moto: '',
    modelo_moto: '',
    kilometraje_moto: 0,
    placa_moto: ''
  };

  ngOnInit() {
    this.emitChange();
  }

  emitChange() {
    this.motoChange.emit(this.moto);
  }

  motoConsola(): void {
    console.log(this.moto);
  }
}