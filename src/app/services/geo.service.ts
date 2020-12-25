import { Injectable } from '@angular/core';
import { Geolocation, Geoposition, PositionError } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GeoService {

  constructor(
    private geolocation: Geolocation,
    private precision: LocationAccuracy
    ) { }

  /**
   * @description se usa para obtener la posición actual del usuario.
   * @returns devuelve una promesa de tipo Geoposition
   */
  posicionActual(): Promise<Geoposition> {
    return this.geolocation.getCurrentPosition({
      timeout: 10000,
      enableHighAccuracy: true,
      maximumAge: 0
    });
  }

  /**
   * @description se usa para obtener la posición actual del usuario de forma continua.
   * @returns devuelve una obserbable de tipo Geoposition o postion error en caso de error
   */
  posicionSiguimiento(): Observable<Geoposition | PositionError> {
    return this.geolocation.watchPosition().pipe(filter((p: any) => p.coords !== undefined));
  }
  
  /**
   * @returns devuelve una promesa de tipo any
   */
  peticionPrecision(): Promise<any>{
    return this.precision.request(this.precision.REQUEST_PRIORITY_HIGH_ACCURACY);
  }


}


