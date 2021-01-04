import { Component, Input, OnInit } from '@angular/core';
import { Map, latLng, tileLayer, Layer, marker, LayerGroup, layerGroup } from 'leaflet';
import { Coordenadas } from 'src/app/model/coordenadas';
import { Nota } from 'src/app/model/nota';
import { MapService } from 'src/app/services/map.service';
// import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  @Input() lat: number;
  @Input() long: number;
  // @Input() width: number = 100;
  // @Input() height: number = 100;
  // tslint:disable-next-line: no-input-rename
  @Input('coor') coor: Coordenadas;
  // tslint:disable-next-line: no-input-rename
  @Input('nota') nota: Nota;
  // tslint:disable-next-line: no-input-rename
  @Input('alto') alto: string = '100%';
  // tslint:disable-next-line: no-input-rename
  @Input('ancho') ancho: string = '100%';




  public map: Map;
  private markerGroup: LayerGroup = null;
  constructor(private mapS: MapService) {
  }

  ngOnInit() {
    setTimeout(async () => {
      if (this.coor){
        await this.mapS.leafletMap(this.coor.latitud, this.coor.longitud);
      }else if ((this.nota?.latitud && this.nota?.longitud)){
          await this.mapS.leafletMap(this.nota?.latitud, this.nota?.longitud);
      }else if ( this.lat && this.long){
        await this.mapS.leafletMap(this.lat, this.long);
      }
    }, 600);
  }




}
