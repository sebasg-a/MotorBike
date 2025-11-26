import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MecanicoService } from '../../services/mecanico.service';

@Component({
  selector: 'app-create-mechanic',
  imports: [FormsModule],
  templateUrl: './create-mechanic.component.html',
  styleUrl: './create-mechanic.component.scss'
})
export class CreateMechanicComponent implements OnInit {

  private mecanicoService = inject(MecanicoService);

  mecanicos: any[] = [];

  mecanico = {
    nombre_mecanico: '',
    apellido_mecanico: '',
    especialidad_mecanico: '',
    telefono_mecanico: '',
    email_mecanico: '',
  };

  ngOnInit(): void {
    // No necesitas emitir nada aquí
  }

  handleSubmit() {
    console.log('Mecánico a enviar:', this.mecanico);

    this.mecanicoService.crearMecanico(this.mecanico).subscribe({
      next: (response) => {
        console.log('Mecánico creado:', response);
        this.mecanicos.push(response);

        // Limpiar formulario
        this.mecanico = {
          nombre_mecanico: '',
          apellido_mecanico: '',
          especialidad_mecanico: '',
          telefono_mecanico: '',
          email_mecanico: ''
        };
      },
      error: (error) => {
        console.error('Error al crear mecánico:', error);
      }
    });
  }
}