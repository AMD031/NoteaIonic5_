import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotadetalladaPageRoutingModule } from './notadetallada-routing.module';

import { NotadetalladaPage } from './notadetallada.page';
import { MapaPage } from '../mapa/mapa.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotadetalladaPageRoutingModule
  ],
  // entryComponents: [],
  declarations: []
})
export class NotadetalladaPageModule {}
