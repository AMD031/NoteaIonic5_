import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { CargaconfService } from 'src/app/services/cargaconf.service';
import { MensajesService } from 'src/app/services/mensajes.service';
import { NotasService } from 'src/app/services/notas.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public bActivo: boolean = true;
  constructor(
    private authS: AuthService,
    private mensaje: MensajesService,
    private router: Router,
    private notasS: NotasService,
    private translate: TranslateService,
    private conf: CargaconfService
  ) {
  }

  ngOnInit() {
    if (this.authS.isLogged()) {
      this.router.navigate(['/']);
    }
  }

  public async login() {
    // await this.mensaje.presentLoading('Espere ...');
    this.bActivo = false;
    this.authS.login().then(
      async (u) => {
        // await this.mensaje.loadingController.dismiss();
        if (u['token'] !== -1) {
          const rep = await this.notasS.iniciaColeccion();
          if (rep) {
            await this.cargaDatos();
            await this.conf.cargarConfig();
            this.router.navigate(['/']);
          }
          this.bActivo = true;
        } else {
          this.bActivo = true;
          this.mensaje.presentToast(this.translate.instant('login.errorConexion'), 'danger');
        }
      }).catch(
        (err) => {
          this.bActivo = true;
          this.mensaje.presentToast(this.translate.instant('login.errorLogin'), 'danger');
        });
  }




  private async cargaDatos($event = null, mostrarLoading: boolean = true, cantidad: number = 7) {
    try {
      await this.mensaje.presentLoading();
      const info: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData> =
      await this.notasS.leeNotasPaginado(cantidad);
      this.notasS.ultimoDocumento = info.docs[info.docs.length - 1];
      // Ya ha llegado del servidor
      this.mensaje.hideLoading();
      let tmp = [];
      info.forEach(
        (valor) => {
          tmp = [...tmp, { id: valor.id, ...valor.data() }];
        });
      this.notasS.listaNotas = [...this.notasS.listaNotas, ...tmp];
    } catch (err) {
      this.mensaje.hideLoading();
      this.mensaje.presentToast(this.translate.instant('cargarDatos.mensajeError'), 'danger');
    }
  }


}
