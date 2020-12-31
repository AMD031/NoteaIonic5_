import { Injectable } from '@angular/core';
import { Map, latLng, tileLayer, Layer, marker, LayerGroup, layerGroup } from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map: Map = null;
  private markerGroup: LayerGroup = null;
  constructor() { }

  leafletMap(lat: number, long: number, id: string = 'mapId') {
    return new Promise(async (resolve, reject) => {
      if (lat && long) {
        // if (!this.map && this.map !== 'undefined') {
        this.map = new Map(id).setView([lat, long], 16);
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        }).addTo(this.map);
      }
      await this.cargarMarcadores(lat, long);
      // }
    });
  }


  // eliminarMapa() {
  //   if (this.map) {
  //     // this.map.remove();
  //     if (document.getElementById("mapId")) {
  //       document.getElementById("mapId").outerHTML = "";
  //     }
  //     // this.map.remove();
  //     // this.map.off();
  //     // this.map.remove();
  //     // this.map = null;
  //   }
  // }

  cargarMarcadores(lat: number, long: number) {
    return new Promise((resolve, reject) => {
      if (this.markerGroup) {
        this.markerGroup.clearLayers();
      }
      this.markerGroup = layerGroup(null).addTo(this.map);
      marker([lat, long])
        .addTo(this.markerGroup)
        .bindPopup(lat + ' ' + long)
        .openPopup();
    });
  }


}
