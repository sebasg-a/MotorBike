import { Injectable } from '@angular/core';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';


(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
@Injectable({
  providedIn: 'root'
})
export class InformesService {

  constructor() {}

  generarInformeMotos(motos: any[]) {

    const content = [
      { text: 'INFORME DE MOTOS', style: 'header' },
      { text: '\n' }
    ];
  
    motos.forEach(m => {
      content.push(
        { text: `📌 Moto: ${m.placa_moto}`, style: 'sub' },
        { text: `Marca: ${m.marca_moto}` },
        { text: `Modelo: ${m.modelo_moto}` },
        { text: `Kilometraje: ${m.kilometraje_moto}` },
        { text: '\n' }
      );
    });
  
    const docDefinition = {
      content,
      styles: {
        header: { fontSize: 22, bold: true },
        sub: { fontSize: 16, bold: true }
      }
    };
  
    pdfMake.createPdf(docDefinition).open();
  }
  

  generarInformeTrabajador(mecanicos: any[]) {

    const docDefinition: any = {
      content: [
        { text: 'Informe de Mecánicos', style: 'header' },
        { text: ' ' },
  
        ...mecanicos.map(m => ({
          stack: [
            { text: `ID: ${m.id_mecanico}` },
            { text: `Nombre: ${m.nombre_mecanico} ${m.apellido_mecanico}` },
            { text: `Especialidad: ${m.especialidad_mecanico}` },
            { text: `Teléfono: ${m.telefono_mecanico}` },
            { text: `Email: ${m.email_mecanico}` },
            { text: ' ' }
          ]
        }))
      ],
  
      styles: {
        header: {
          fontSize: 22,
          bold: true
        }
      }
    };
  
    pdfMake.createPdf(docDefinition).open();
  }
  
  
  
  

}
