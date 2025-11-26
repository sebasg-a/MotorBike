import { Injectable } from '@angular/core';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';


(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
@Injectable({
  providedIn: 'root'
})
export class InformesService {

  constructor() {}

  generarInformeMotos(motoData: any) {

    const docDefinition: any = {
      content: [
        { text: 'Informe de Moto', style: 'header' },
        { text: ' ' },
        { text: `Placa: ${motoData.placa}` },
        { text: `Marca: ${motoData.marca}` },
        { text: `Modelo: ${motoData.modelo}` },
        { text: `Kilometraje: ${motoData.kilometraje}` },
        { text: `Cliente: ${motoData.cliente}` },
        { text: `Servicios:` },
        {
          ul: motoData.servicios.map((s: any) => `${s.fecha} - ${s.descripcion}`)
        }
      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true
        }
      }
    };

    pdfMake.createPdf(docDefinition).download();
  }

  generarInformeTrabajador(trabajadorData: any) {

    const docDefinition: any = {
      content: [
        { text: 'Informe del Mecanico', style: 'header' },
        { text: ' ' },
        { text: `Nombre: ${trabajadorData.nombre}` },
        { text: `Cédula: ${trabajadorData.cedula}` },
        { text: `Total Servicios Realizados:` },
        {
          ul: trabajadorData.servicios.map((s: any) => `${s.fecha} - ${s.descripcion}`)
        }
      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true
        }
      }
    };

    pdfMake.createPdf(docDefinition).download();
  }

}
