import { Injectable } from '@angular/core';
import { Vibration } from '@ionic-native/vibration/ngx';

@Injectable({
  providedIn: 'root'
})
export class VibraService {
  constructor(private vibra: Vibration) { }
  public vibracion(duracion: number = 1000){
    this.vibra.vibrate(duracion);
  }


}
