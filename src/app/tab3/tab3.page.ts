import { Component } from '@angular/core';
import { MapService } from '../services/map.service';
// import { Map, latLng, tileLayer, Layer, marker, LayerGroup, layerGroup } from 'leaflet';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  // private map: Map;
  // private lat: number;
  // private long: number;
  // private markerGroup: LayerGroup = null;

  constructor(private mapaS: MapService) {
    // this.lat = 37;
    // this.long = 10;
  }

  ngOnInit() {
    // this.mapaS.leafletMap(30, 40, 'mapId2');
  }

  // ionViewDidEnter() {
  //   this.cargarMarcadores();
  // }

  // async leafletMap() {
  //   if (!this.map) {
  //     this.map = new Map('mapId').setView([this.lat, this.long], 16);
  //     tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //     }).addTo(this.map);
  //   }
  // }

  // cargarMarcadores() {
  //   if (this.markerGroup) {
  //     this.markerGroup.clearLayers();
  //   }
  //   this.markerGroup = layerGroup(null).addTo(this.map);
  //   marker([this.lat, this.long])
  //     .addTo(this.markerGroup)
  //     .bindPopup('posición')
  //     .openPopup();
  // }
}





