import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Preferencias } from 'src/app/model/preferencias';
import { CargaconfService } from 'src/app/services/cargaconf.service';
import { MensajesService } from 'src/app/services/mensajes.service';
import { TemasService } from 'src/app/services/temas.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  public verIdiomas = false;
  public verTemas = false;
  public verOPvibracion = false;
  private resulVibracion = true;
  public fg: FormGroup;

  // private preferencia: Preferencias = {
  //   idioma: 'spagnol',
  //   tema: 'light',
  //   vibracion: true
  // };

  constructor(
    private translate: TranslateService,
    private temaS: TemasService,
    private storage: NativeStorage,
    private formBuilder: FormBuilder,
    private mensaje: MensajesService,
    private cargaconf: CargaconfService

  ) {
    this.fg = this.formBuilder.group({
      idioma: ['es'],
      tema: ['light'],
      vibracion: [true],
    });
    // setTimeout(() => {
    //   this.cargarOpmenu();
    // }, 700);
  }
  async ngOnInit() {
    // console.log('entra ngOnInit');
  }

  cargarOpmenu() {
    try {
      if (
        this.cargaconf.preferencias.idioma !== '' &&
        this.cargaconf.preferencias.tema !== ''
      ) {
        this.fg.get('idioma').setValue(this.cargaconf.preferencias.idioma);
        this.fg.get('tema').setValue(this.cargaconf.preferencias.tema);
      }
      this.fg.get('vibracion').setValue(this.cargaconf.preferencias.vibracion);

    } catch (error) {
      this.mensaje.presentToast('error pref', 'danger');
    }
  }

  menuAbierto() {
    this.cargarOpmenu();
  }

  verOpcionesIdioma() {
    this.verIdiomas = !this.verIdiomas;
  }

  verOpcionesTemas() {
    this.verTemas = !this.verTemas;
  }

  verOpcionesVibracion() {
    this.verOPvibracion = !this.verOPvibracion;
  }

  async guardarPreferencia() {
    try {
      const preferencias: Preferencias = {
        idioma: this.fg.get('idioma').value,
        tema: this.fg.get('tema').value,
        vibracion: this.fg.get('vibracion').value,
      };

      if (preferencias) {
        this.cargaconf.preferencias.idioma = this.fg.get('idioma').value;
        this.cargaconf.preferencias.tema = this.fg.get('tema').value;
        this.cargaconf.preferencias.vibracion = this.fg.get('vibracion').value;
      }
      if (this.cargaconf.email !== '') {
        await this.storage.setItem(this.cargaconf.email, preferencias);
      }

      switch (preferencias.tema) {
        case 'dark':
          this.temaS.enableDark();
          break;
        case 'light':
          this.temaS.enableLight();
          break;
      }

      switch (preferencias.idioma) {
        case 'en':
          this.translate.setDefaultLang('en');
          this.cargaconf.preferencias.idioma = 'en';
          break;
        case 'es':
          this.translate.setDefaultLang('es');
          this.cargaconf.preferencias.idioma = 'es';
          break;
      }
      this.mensaje.presentToast(this.translate.instant('mensajePreferencia.guardar'), 'success');
    } catch (err) {
      this.mensaje.presentToast(this.translate.instant('mensajePreferencia.errGuardar'), 'danger');
    }
  }





}
