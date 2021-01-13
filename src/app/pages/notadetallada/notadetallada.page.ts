import { Component, Input, OnInit } from '@angular/core';
import { Nota } from 'src/app/model/nota';
import { MapaPage } from '../mapa/mapa.page';
import * as moment from 'moment';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-notadetallada',
  templateUrl: './notadetallada.page.html',
  styleUrls: ['./notadetallada.page.scss'],
})
export class NotadetalladaPage implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('nota') nota: Nota;
  constructor(private translate: TranslateService) { }
  ngOnInit() {
  }


  modificaFecha(fecha: any, modo: string): string {
    switch (modo) {
      case 'compuesta':
        return moment.unix(fecha.seconds).format('DD/MM/YYYY h:mm');
        break;
      case 'simple':
        return moment.unix(fecha.seconds).format('DD/MM/YYYY');
        break;
      case 'hora':
        return moment.unix(fecha.seconds).format('HH:MM');
        break;
    }
  }


  obtenerPrioridad(prioridad: any): string {

    switch (prioridad) {
      case '5':
        return this.translate.instant('formularioNota.sinPrioridad');

      case '4':
        return this.translate.instant('formularioNota.minima');

      case '3':
        return this.translate.instant('formularioNota.normal');

      case '2':
        return this.translate.instant('formularioNota.importante');

      case '1':
        return this.translate.instant('formularioNota.urgente');
    }

  }




}
