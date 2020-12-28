import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Preferencias } from '../model/preferencias';
import { MensajesService } from './mensajes.service';
import { TemasService } from './temas.service';

@Injectable({
  providedIn: 'root'
})
export class CargaconfService {
  public preferencias: Preferencias = {
    idioma: '',
    tema: '',
    vibracion: true,
  };
  public email: string = '';
  constructor(
    private storage: NativeStorage,
    private temaS: TemasService,
    private translate: TranslateService,
    private mensaje: MensajesService,
  ) { }
  public async cargarConfig(u: any) {
    try {
      // const u = await this.storage.getItem('user');
      this.email = u['email'];
      let pre = null;
      pre = await this.storage.getItem(this.email);
      if (pre) {
        this.preferencias = {
          idioma: pre['idioma'],
          tema: pre['tema'],
          vibracion: pre['vibracion'],
        };
        switch (this.preferencias.tema) {
          case 'dark':
            this.temaS.enableDark();
            break;
          case 'light':
            this.temaS.enableLight();
            break;
        }
        switch (this.preferencias.idioma) {
          case 'en':
            this.translate.setDefaultLang('en');
            break;
          case 'es':
            this.translate.setDefaultLang('es');
            break;
        }
      } else {
        this.translate.setDefaultLang('es');
        this.temaS.enableLight();
      }
    } catch (error) {

    }


  }



}
