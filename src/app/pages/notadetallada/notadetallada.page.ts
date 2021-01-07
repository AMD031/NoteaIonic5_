import { Component, Input, OnInit } from '@angular/core';
import { Nota } from 'src/app/model/nota';
import { MapaPage } from '../mapa/mapa.page';
import * as moment from 'moment';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-notadetallada',
  templateUrl: './notadetallada.page.html',
  styleUrls: ['./notadetallada.page.scss'],
})
export class NotadetalladaPage implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('nota') nota: Nota;
  constructor(private modal: ModalController) { }
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





}
