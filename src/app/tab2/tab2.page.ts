import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Geoposition } from '@ionic-native/geolocation/ngx';
// import { Vibration } from '@ionic-native/vibration/ngx';
import { ModalController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { Coordenadas } from '../model/coordenadas';
// import { LoadingController, ToastController } from '@ionic/angular';
import { Nota } from '../model/nota';
import { FotoService } from '../services/foto.service';
import { GeoService } from '../services/geo.service';
import { GestionfotoService } from '../services/gestionfoto.service';
import { MensajesService } from '../services/mensajes.service';
import { NotasService } from '../services/notas.service';
import { VibraService } from '../services/vibra.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  @Input('nota') nota: Nota;
  public fechaMinima: string;
  public bActivo: boolean = true;
  public coor: Coordenadas;
  public tasks: FormGroup;
  public fechaLimite: any;
  public horaMinima: any;
  public imagen: string = null;
  public datosImg: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private notasS: NotasService,
    private geo: GeoService,
    private mensaje: MensajesService,
    private platform: Platform,
    private vibra: VibraService,
    public translate: TranslateService,
    private modalController: ModalController,
    private foto: FotoService,
    private fotoGS: GestionfotoService

  ) {
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
      fechaLimite: ['', Validators.required],
      hora: ['', Validators.required]
    });
  }

  ionViewDidEnter() {
    if (this.nota?.id) {
      this.tasks.get('title').setValue(this.nota.titulo);
      this.tasks.get('description').setValue(this.nota.texto);
      this.tasks.get('latitud').setValue(this.nota.latitud);
      this.tasks.get('longitud').setValue(this.nota.longitud);
      this.tasks.get('longitud').setValue(this.nota.longitud);
      this.tasks.get('fechaLimite').setValue(moment.unix(this.nota.fechaLimite.seconds).format('YYYY-MM-DD'));
      this.tasks.get('hora').setValue(moment.unix(this.nota.hora.seconds).format());
    }
  }


  ionViewWillEnter() {
    // alert(JSON.stringify(this.nota.id));
    this.hoy();
  }

  private hoy() {
    this.fechaMinima = moment(new Date()).format('YYYY-MM-DD');
  }

  private async geoAltaPrecision() {
    try {
      const rep: any = await this.geo.peticionPrecision();
      // if (rep.code === 0){
      //   this.mensaje.presentToast('Permiso establecido.', 'success');
      // }
    } catch (error) {
      this.mensaje.presentToast(this.translate.instant('geo.errorPrecisionPermiso'), 'warning');
    }
  }

  /**
   * @description asigna la coordenada al formulario.
   */
  private asignaCoor(): void {
    if (this.coor) {
      // console.log(this.coor);
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
      this.mensaje.loadingController.dismiss();
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

  private async borrarImagenExistente() {
    if (this.nota?.id) {
      const idImagen = this.nota?.datosImagen?.res.public_id;
      if (idImagen) {
        await this.borrarImagen(idImagen);
      }
    }
  }

  public async sendForm() {

    if (this.imagen) {
      if (this.nota?.datosImagen &&
         this.nota?.datosImagen !== ''){
         await this.borrarImagenExistente();
      }
      if (this.imagen) {
        try {
          // console.log('base64:' + this.imagen);
          // this.datosImg = await this.fotoGS.subirFotoHttp(this.imagen);
          this.datosImg = await this.guardarFoto();
        } catch (error) {
          console.log(error);
        }
      }
    }
    const fechaLimite = this.tasks.get('fechaLimite').value;
    const hora = this.tasks.get('hora').value;
    const data: Nota = {
      titulo: this.tasks.get('title').value,
      texto: this.tasks.get('description').value,
      latitud: this.tasks.get('latitud').value,
      longitud: this.tasks.get('longitud').value,
      fechaLimite: fechaLimite ? moment(fechaLimite, 'YYYY-MM-DD').toDate() : '',
      hora: hora ? moment(hora).toDate() : '',
      datosImagen: this.datosImg ? this.datosImg : ''
    };
    // console.log(moment(hora).toDate());

    if (!this.nota?.id) {
      data.fechaCreacion = moment(new Date(), 'YYYY-MM-DD h:mm').toDate();
    }

    if (this.nota?.id) {
      //editar nota
      await this.mensaje.presentLoading(this.translate.instant('cargarDatos.loading'));
      this.notasS.actualizaNota(this.nota.id, data)
        .then((respuesta) => {
          this.mensaje.hideLoading();
          this.mensaje.presentToast(this.translate.instant('editarNota.notaEditada'), 'success');
          this.modalController.dismiss();
        })
        .catch((err) => {
          console.log(err);
          this.mensaje.hideLoading();
          this.mensaje.presentToast(this.translate.instant('editarNota.errorEditado'), 'danger');
          // console.log(err);
        });

    } else {
      // agregar nota
      await this.mensaje.presentLoading();
      // alert(JSON.stringify(data));
      this.notasS.agregaNota(data)
        .then((respuesta) => {
          this.tasks.setValue({
            title: '',
            description: '',
            latitud: '',
            longitud: '',
            fechaLimite: '',
            hora: ''
          });
          this.datosImg = null;
          this.imagen = null;
          this.mensaje.hideLoading();
          this.mensaje.presentToast(this.translate.instant('formularioNota.notaGuardada'), 'success');
        })
        .catch((err) => {
          console.log(err);
          this.mensaje.hideLoading();
          this.mensaje.presentToast(this.translate.instant('editarNota.notaEditada'), 'success');
        });
    }

  }

  async tomarFoto() {
    try {
      const imageData = await this.foto.tomarfoto(30);
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      // const base64Image = imageData;
      // console.log("imageData: " + imageData);
      this.imagen = base64Image;
    } catch (err) {
      this.mensaje.presentToast('Error', 'danger');
    }

  }

  guardarFoto() {
    return new Promise((resolve, reject) => {
      if (this.imagen) {
        this.fotoGS.subirFoto(this.imagen).subscribe(
          (resp) => {
            resolve(resp);
          });
      }
    });
  }

  borrarImagen(id: any) {
    return new Promise((resolve, reject) => {
      this.fotoGS.borrarImagen(id).subscribe(
        (res) => {
          resolve(res);
        });
    });
  }






}

