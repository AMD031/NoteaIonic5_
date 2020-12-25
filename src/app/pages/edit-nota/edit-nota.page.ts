import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Geoposition } from '@ionic-native/geolocation/ngx';
import { ModalController } from '@ionic/angular';
import { Coordenadas } from 'src/app/model/coordenadas';
// import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Nota } from 'src/app/model/nota';
import { GeoService } from 'src/app/services/geo.service';
import { MensajesService } from 'src/app/services/mensajes.service';
import { NotasService } from 'src/app/services/notas.service';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-nota',
  templateUrl: './edit-nota.page.html',
  styleUrls: ['./edit-nota.page.scss'],
})
export class EditNotaPage {

  @Input('nota') nota: Nota; 
  public fechaMinima: string;
  public bActivo: boolean = true;
  public coor: Coordenadas;
  public tasks: FormGroup;
  public fechaLimite: any;
  constructor(
    private formBuilder: FormBuilder,
    private notasS: NotasService,
    // public loadingController: LoadingController,
    // public toastController: ToastController,
    private modalController: ModalController,
    private mensaje: MensajesService,
    private geo: GeoService,
    private platform: Platform,
    private translate: TranslateService
  ) {

    this.hoy();
    platform.ready().then(() => {
      if (this.platform.is('android')) {
        this.geoAltaPrecision();
      }
      }).catch(
      async (err) => {
        await this.mensaje.presentToast(err, 'danger');
      });

    this.tasks = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      latitud: [''],
      longitud: [''],
      fechaLimite: [''],
    });
  }

  private async geoAltaPrecision() {
    try {
      const rep: any = await this.geo.peticionPrecision();
      } catch (error) {
   
       this.mensaje.presentToast(this.translate.instant('geo.errorPrecisionPermiso'), 'danger');
    }
  }

  ionViewDidEnter() {
    if (this.nota?.id){
      this.tasks.get('title').setValue(this.nota.titulo);
      this.tasks.get('description').setValue(this.nota.texto);
      this.tasks.get('latitud').setValue(this.nota.latitud);
      this.tasks.get('longitud').setValue(this.nota.longitud);
      this.tasks.get('longitud').setValue(this.nota.longitud);
      this.tasks.get('fechaLimite').setValue(this.nota.fechaLimite);
    }
  }

  /**
   * @description asigna la coordenada al formulario.
   */
  private asignaCoor(): void {
    if (this.coor) {
      console.log(this.coor);
      this.tasks.get('latitud').setValue(this.coor.latitud);
      this.tasks.get('longitud').setValue(this.coor.longitud);
    }
  }


  /** 
   *  @description obtine la posición actual del usuario.
   *  @returns devuelve una promesa de tipo void.
   */
  public async obtenerPosicion() {
    this.bActivo = false;
    let pos: Geoposition = null;
    try {
      await this.mensaje.presentLoading(this.translate.instant('geo.obteniendoPosicion'));
      pos = await this.geo.posicionActual();
      this.bActivo = true;
      this.mensaje.hideLoading();
      this.coor = {
        latitud: pos.coords.latitude,
        longitud: pos.coords.longitude,
      };
      this.asignaCoor();
    } catch (error) {
      this.bActivo = true;
      // console.log(error);
      await this.mensaje.hideLoading();
      await this.mensaje.presentToast(this.translate.instant('geo.errorPosicion'), 'danger');
    }
  }

  public async sendForm() {
    await this.mensaje.presentLoading();
    const fechaLimite = this.tasks.get('fechaLimite').value;
    console.log(fechaLimite);
    const data: Nota = {
      titulo: this.tasks.get('title').value,
      texto: this.tasks.get('description').value,
      latitud: this.tasks.get('latitud').value,
      longitud: this.tasks.get('longitud').value,
      fechaCreacion: moment(new Date(), 'YYYY-MM-DD h:mm').toDate(),
      fechaLimite: fechaLimite ? moment(fechaLimite, 'YYYY-MM-DD h:mm').toDate() : '',
    };
    this.notasS.actualizaNota(this.nota.id, data)
      .then((respuesta) => {
        this.mensaje.hideLoading();
        this.mensaje.presentToast(this.translate.instant('editarNota.notaEditada'), 'success');
        this.modalController.dismiss();
      })
      .catch((err) => {
        this.mensaje.hideLoading();
        this.mensaje.presentToast(this.translate.instant('editarNota.errorEditado'), 'danger');
        // console.log(err);
      });
  }

  private hoy(): void {
   this.fechaMinima = moment(new Date()).format('YYYY-MM-DD');
  }

  //  formatoFecha(date: Date, format: any): string {
  //   const map = {
  //     mm: date.getMonth() + 1,
  //     dd: (date.getDate().toString().length === 1) ? '0' + date.getDate() : date.getDate() ,
  //     yy: date.getFullYear().toString().slice(-2),
  //     yyyy: date.getFullYear()
  //   };
  //   return format.replace(/mm|dd|yy|yyy/gi, matched => map[matched]);
  // }
 
}
