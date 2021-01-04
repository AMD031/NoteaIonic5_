import { Injectable } from '@angular/core';
import { Map, latLng, tileLayer, Layer, marker, LayerGroup, layerGroup , icon } from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map: Map = null;
  private markerGroup: LayerGroup = null;
 
  // private icono = icon({
  //   iconUrl: 'assets/img/ubicacion.svg',
  //   iconSize: [15, 15], 
  //   popupAnchor: [0, -20]
  // });

  private icono = icon({
    iconUrl: 'assets/img/ubicacion.svg',
    // shadowUrl: 'assets/img/ubicacion.svg',

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

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
      marker([lat, long], {icon: this.icono})
        .addTo(this.markerGroup)
        .bindPopup(lat + ' ' + long)
        .openPopup();
    });
  }


}
