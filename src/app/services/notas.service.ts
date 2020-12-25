import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { Nota } from '../model/nota';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  public listaNotas = [];
  public ultimoDocumento: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData> = null;
  private myCollection: AngularFirestoreCollection<any>;
  constructor(
    private storage: NativeStorage,
    private fire: AngularFirestore,
    private AuthS: AuthService,
    private plataforma: Platform
  ) {
    this.iniciaColeccion();
  }

  iniciaColeccion(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.ultimoDocumento = null;
      this.listaNotas = [];
      this.plataforma.ready().then(
        async () => {
          try {
            const u = await this.storage.getItem('user');
            if (u.email) {
              this.myCollection = this.fire.collection<any>(`${environment.notasCollection}/${u.email}/nota`);
            }
            resolve(true);
          } catch (error) {
            resolve(false);
          }
        });
    });


  }

  agregaNota(nuevaNota: Nota): Promise<any> {
    return this.myCollection.add(nuevaNota);
  }

  leeNotas(): Observable<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> {
    return this.myCollection.get();
  }

  leeNota(id: any): Observable<any> {
    return this.myCollection.doc(id).get();
  }
  actualizaNota(id: any, nuevaNota: Nota): Promise<void> {
    return this.myCollection.doc(id).update(nuevaNota);
  }
  borraNota(id: any): Promise<void> {
    return this.myCollection.doc(id).delete();
  }

  // FIN CRUD BASICO
  leeNotasPaginado(
    cantidad: number = 7,
    ordenarPor: string = 'fechaCreacion',
    criterio: string = '',
    buscarPor: string = 'titulo'
  )
    : Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> {
    if (criterio.length > 0) {
      if (buscarPor === 'titulo' || buscarPor === 'texto') {

        return this.myCollection.ref
          .orderBy(buscarPor)
          .startAt(criterio)
          .endAt(criterio + '\uf8ff')
          .get();

      } else if(buscarPor === 'fechaCreacion' || buscarPor === 'fechaLimite') {
        if (moment(criterio, 'DD/MM/YYYY').isValid()) {
          return this.myCollection.ref
          .where(buscarPor, '>=', moment(criterio, 'DD/MM/YYYY').toDate())
          .get();
        } else {
          return this.myCollection.ref.where(buscarPor, '==', -1).get();
        }
      }
    } else {
      if (ordenarPor === 'fechaCreacion') {
        return this.myCollection.ref
          .orderBy(ordenarPor)
          .startAfter(this.ultimoDocumento)
          .limit(cantidad)
          // .startAt(criterio)
          // .endAt(criterio + '\uf8ff')
          .get();
      } else {
        return this.myCollection.ref
          .orderBy(ordenarPor)
          .orderBy('hora')
          .startAfter(this.ultimoDocumento)
          .limit(cantidad)
          // .startAt(criterio)
          // .endAt(criterio + '\uf8ff')
          .get();
      }
    }
  }




}
