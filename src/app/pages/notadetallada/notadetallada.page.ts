import { Component, Input, OnInit } from '@angular/core';
import { Nota } from 'src/app/model/nota';
import { MapaPage } from '../mapa/mapa.page';

@Component({
  selector: 'app-notadetallada',
  templateUrl: './notadetallada.page.html',
  styleUrls: ['./notadetallada.page.scss'],
})
export class NotadetalladaPage implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('nota') nota: Nota;
  constructor() { }
  ngOnInit() {
  }

}
