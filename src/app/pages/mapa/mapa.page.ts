import { Component, Input, OnInit } from '@angular/core';
import { Map, latLng, tileLayer, Layer, marker, LayerGroup, layerGroup} from 'leaflet';
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

  // @Input() lat: number = 10;
  // @Input() long: number = 10;
  // @Input() width: number = 100;
  // @Input() height: number = 100;
  // tslint:disable-next-line: no-input-rename
  @Input('nota') coor: Coordenadas;
  public  map: Map;
  private markerGroup: LayerGroup = null;
  constructor(private mapS: MapService) {
  }

  ngOnInit() {
    setTimeout(async () => {
      await this.mapS.leafletMap(this.coor.latitud, this.coor.longitud);
    }, 600);
  }
}
