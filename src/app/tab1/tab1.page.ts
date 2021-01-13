import { Component, Sanitizer, ViewChild } from '@angular/core';
import { /*IonInfiniteScroll,*/ IonSearchbar, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { Nota } from '../model/nota';
import { NotadetalladaPage } from '../pages/notadetallada/notadetallada.page';
import { CargaconfService } from '../services/cargaconf.service';
import { GestionfotoService } from '../services/gestionfoto.service';
// import { AuthService } from '../services/auth.service';
import { MensajesService } from '../services/mensajes.service';
import { NotasService } from '../services/notas.service';
import { VibraService } from '../services/vibra.service';
import { Tab2Page } from '../tab2/tab2.page';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  // public listaNotas = [];
  private ordenarPor: string = "fechaCreacion";
  private paginado: number = 7;
  private carga: string;
  public criterio = '';
  public cantidadNueva = 2;
  public buscarPor: string = 'titulo';
  public fin: boolean = false;
  public seleccionBuscar: number = 1;
  public tipoTeclado = 'text';


  cabeceraPaginacion: any = {
    header: `${this.translate.instant('OpPaginado.cabecera') + ':'}`
  };
  cabeceraOrdenar: any = {
    header: `${this.translate.instant('OpOrdenarPor.cabecera') + ':'}`
  };



  constructor(
    // private authS: AuthService,
    public notasS: NotasService,
    private modalController: ModalController,
    public mensaje: MensajesService,
    private vibra: VibraService,
    public translate: TranslateService,
    private conf: CargaconfService,
    private fotoGS: GestionfotoService,
    ) { }

  @ViewChild(IonSearchbar) barraBusqueda: IonSearchbar;
  // @ViewChild(IonInfiniteScroll) infinito: IonInfiniteScroll;

  // tslint:disable-next-line: use-lifecycle-interface


  async ngOnInit() {
    this.fin = false;
  }


  ionViewWillEnter() {
    if (this.notasS.listaNotas.length === 0) {
      this.cargaDatos(null, true, true);
    }
  }

  public async cargaDatos(
    $event = null,
    mostrarLoading: boolean = true,
    recargar: boolean = false,
  ) {
    try {
      if (recargar) {
        this.notasS.ultimoDocumento = null;
        this.notasS.listaNotas = [];
        this.fin = false;
        // this.barraBusqueda.value = '';
      }

      if ((!$event) && (mostrarLoading)) {
        await this.mensaje.presentLoading(this.translate.instant('cargarDatos.loading'));
      }
      this.notasS.leeNotasPaginado(this.paginado, this.ordenarPor, this.criterio, this.buscarPor).then(

        (info: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
          this.cantidadNueva = info.docs.length;
          // alert(this.cantidadNueva);
          if (this.cantidadNueva > 0) {
            this.notasS.ultimoDocumento = info.docs[this.cantidadNueva - 1];
          } else {
            this.fin = true;
          }
          // Ya ha llegado del servidor
          this.mensaje.hideLoading();
          if (!this.fin) {
            let tmp = [];
            info.forEach(
              (valor) => {
                tmp = [...tmp, { id: valor.id, ...valor.data() }];
              });
            this.notasS.listaNotas = [...this.notasS.listaNotas, ...tmp];
            // console.log(this.notasS.listaNotas);
          }
          if ($event) {
            $event.target.complete();
          }

        });
    } catch (err) {
      // console.log(err);
      if ($event) {
        $event.target.complete();
      }
      this.notasS.ultimoDocumento = null;
      this.mensaje.hideLoading();
      this.mensaje.presentToast(this.translate.instant('cargarDatos.mensajeError'), 'danger');
      console.log(err);
    }
  }

  async loadData($event = null) {
    if (this.criterio === '' && !this.fin) {
      await this.cargaDatos($event, false);
    } else {
      $event.target.complete();
    }
  }
  async alertaBorrar(id: any, idImagen: any = null) {
    if (this.conf.preferencias.vibracion) {
      this.vibra.vibracion();
    }

    const resp = await this.mensaje.presentAlertConfirm(
      this.translate.instant('mensajesBorrar.cabeceraBorrar'),
      this.translate.instant('mensajesBorrar.preguntaBorrar'),
      this.translate.instant('mensajesBorrar.cancelar'),
      this.translate.instant('mensajesBorrar.aceptar'),
    );
    if (resp) {

      try {
        await this.mensaje.presentLoading(this.translate.instant('listado.eliminar'));
        if (idImagen) {
          await this.borrarImagen(idImagen);
        }
        this.borraNota(id);
        // this.cargaDatos(null, true, true);
        this.mensaje.hideLoading();
      } catch (error) {
        this.mensaje.hideLoading();
      }
    }
  }

  borrarImagen(id: any) {
    return new Promise((resolve, reject) => {
      this.fotoGS.borrarImagen(id).subscribe(
        (res) => {
          resolve(res);
        });
    });
  }

  

  public async borraNota(id: any) {

    this.notasS.borraNota(id)
      .then(() => {
        //  está borrada allí
        this.notasS.listaNotas = this.notasS.listaNotas.filter(
          (nota) => (nota.id !== id)
        );

        this.mensaje.presentToast(this.translate.instant('mensajesBorrar.Mensajeborra'), 'success');
        // this.notasS.listaNotas = tmp;
        // this.cargaDatos(null, true, true);
      })
      .catch(err => {
        this.mensaje.presentToast(this.translate.instant('mensajesBorrar.errorBorrar'), 'danger');
      });
  }

  public async editaNota(nota: Nota) {
    const modal = await this.modalController.create({
      component: Tab2Page,
      cssClass: 'my-custom-class',
      componentProps: {
        nota: nota
      }
    });
    return await modal.present();
  }

  public async notaDetallada(nota: Nota) {
    const modal = await this.modalController.create({
      component: NotadetalladaPage,
      cssClass: 'my-custom-class',
      componentProps: {
        nota: nota
      }
    });
    return await modal.present();
  }






  async onSearchChange(evento) {
    // this.cargaDatos(null, false, false, 7);
    this.criterio = evento.target.value;
    this.criterio = this.criterio.trim();
    if (this.criterio !== '') {
      this.notasS.ultimoDocumento = null;
      this.notasS.listaNotas = [];
    }
    await this.cargaDatos(null, true, true);
  }

  modificaFecha(fecha: any, modo: string): string {
    switch (modo) {
      case 'compuesta':
        return moment.unix(fecha.seconds).format('DD/MM/YYYY h:mm');
        break;
      case 'simple':
        return moment.unix(fecha.seconds).format('DD/MM/YYYY');
        break;
      case 'hora':
        return moment.unix(fecha.seconds).format('HH:MM');
        break;
    }
  }

  public async cambiarPaginado($event) {

    if ($event) {
      this.paginado = parseInt($event.target.value);
      await this.cargaDatos(null, true, true);
    }
    // console.log(this.paginado);
  }

  public async cambiarOrden($event) {
    if ($event) {
      this.ordenarPor = $event.target.value;
      this.cargaDatos(null, true, true);
    }
    // console.log(this.ordenarPor);
  }

  public async menuAlertBucar() {
    const resp: string = await this.mensaje.presentAlertRadio( this.translate.instant('OpBuscarPor.cabecera'), [
      {
        name: 'titulo',
        label: this.translate.instant('OpBuscarPor.titulo'),
        type: 'radio',
        value: 'titulo',
        checked: this.seleccionBuscar === 1 ? true : false
      },
      {
        name: 'texto',
        label: this.translate.instant('OpBuscarPor.descripcion'),
        type: 'radio',
        value: 'texto',
        checked: this.seleccionBuscar === 2 ? true : false
      },
      {
        name: 'fechaCreacion',
        label: this.translate.instant('OpBuscarPor.fechaCreacion'),
        type: 'radio',
        value: 'fechaCreacion',
        checked: this.seleccionBuscar === 3 ? true : false
      },
      {
        name: 'fechaLimite',
        label: this.translate.instant('OpBuscarPor.fechaLimite'),
        type: 'radio',
        value: 'fechaLimite',
        checked: this.seleccionBuscar === 4 ? true : false
      },
    ],
       this.translate.instant('AcCan.Cancelar'),
       this.translate.instant('AcCan.Aceptar'),
      ''
    );
    // console.log('respuesta: ', resp);
    if (resp) {
      this.buscarPor = resp;
      switch (this.buscarPor) {
        case 'titulo':
          this.tipoTeclado = 'text';
          this.seleccionBuscar = 1;
          this.barraBusqueda.value = '';

          break;
        case 'texto':
          this.tipoTeclado = 'text';
          this.seleccionBuscar = 2;
          this.barraBusqueda.value = '';

          break;
        case 'fechaCreacion':
          this.tipoTeclado = 'numeric';
          this.seleccionBuscar = 3;
          this.barraBusqueda.value = '';

          break;
        case 'fechaLimite':
          this.tipoTeclado = 'numeric';
          this.seleccionBuscar = 4;
          this.barraBusqueda.value = '';
          break;
      }

     } /* else {
       this.seleccionBuscar = 1;
      this.buscarPor = 'texto';
     }*/
  }


  acortaTexto(texto: string) {
    let textoAcortado = texto.slice(0, 10);
    if (texto.length > 10) {
      textoAcortado = textoAcortado + '...';
    }
    return textoAcortado;
  }

  nuevacabeceraPaginacion(){
    this.cabeceraPaginacion = {
      header: `${this.translate.instant('OpPaginado.cabecera') + ':'}`
    };
  }
  nuevacabeceraOrden(){
    this.cabeceraOrdenar = {
      header: `${this.translate.instant('OpOrdenarPor.cabecera') + ':'}`
    };
  }


  urlPrioridad(prioridad: any): string {

    switch (prioridad) {
      case '5':
        return 'assets/img/five.svg';

      case '4':
        return 'assets/img/four.svg';

      case '3':
        return 'assets/img/three.svg';

      case '2':
        return 'assets/img/two.svg';

      case '1':
        return 'assets/img/one.svg';
    }

  }

}
