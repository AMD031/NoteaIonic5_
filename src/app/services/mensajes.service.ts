import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ElementoAlert } from '../model/elementoAlert';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {
  myloading: any;
  public ocultar: boolean = false;
  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    public loadingController: LoadingController
  ) { }

  /**
   * 
   * @param cabecera mensaje que se usara en la cabecera del mensaje
   * @param mensaje pregunta o mensaje que aparecerá en el dialogo.
   * @param textoCancelar texto del botón cancelar
   * @param textoConfirmar texto del botón confirmar
   * @description muestra una alerta
   */
  presentAlertConfirm(cabecera: string, mensaje: string, textoCancelar: string, textoConfirmar: string)
    : Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.alertController.create({
        cssClass: 'my-custom-class',
        header: cabecera,
        message: `<strong>${mensaje}</strong>`,
        buttons: [
          {
            text: textoCancelar,
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              resolve(false);
            }
          }, {
            text: textoConfirmar,
            handler: () => {
              resolve(true);
            }
          }
        ]
      }).then(
        (alert) => {
          alert.present();
        });
    });
  }

  /**
   * @param msg mensaje que usara el toast
   * @param col color que tendrá el toast
   * @description muestra un toast
   */
  async presentToast(msg: string, col: string, dur: number = 2000): Promise<void> {
    const toast = await this.toastController.create({
      message: msg,
      color: col,
      duration: dur,
      position: 'middle'
    });
    toast.present();
  }


  /**
   *  @description muestra un loading.
   */
  async presentLoading(msg: string = 'Cargando ...'): Promise<void> {
    this.hideLoading();
    this.myloading = await this.loadingController.create({
      cssClass: 'spinerOp',
      message: msg,
      spinner: 'crescent'
    });
    await this.myloading.present();
  }


  /**
   * @description oculta el loading.
   */
  hideLoading() {
    if (this.myloading) {
      this.myloading.dismiss();
    }
  }

  async presentAlertRadio(
    cabecera: string = 'Alert',
    elementos: Array<ElementoAlert> = [],
    textoCancelar: string = 'cancelar',
    textoAceptar: string = 'aceptar',
    mensaje: string = 'Elige'
  ): Promise<string> {
    return new Promise(async (resolve, reject) => {
      await this.alertController.create({
        cssClass: 'my-custom-class',
        header: cabecera,
        message: mensaje,
        inputs: [
          ...elementos as any
        ],
        buttons: [
          {
            text: textoCancelar,
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              resolve(null);
            }
          }, {
            text: textoAceptar,
            handler: (value) => {
              resolve(value);
            }
          }
        ]
      }).then(
        (alert) => {
          alert.present();
        });
    });
  }
  ocutarInerfaz() {
    this.ocultar = !this.ocultar;
  }

  public urlNueva() {
    if (this.ocultar) {
      return 'assets/img/mostrar.svg';
    } else {
      return 'assets/img/ocultar.svg';
    }
  }

}
