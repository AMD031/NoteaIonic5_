import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GestionfotoService {

  constructor(
    private http: HttpClient,
  ) { }


  private get header(): any {
    return {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    };
  }

  // post
  subirFoto(info: any): Observable<any> {
    const endPoint = environment.heroku + '/api/upload';
    return this.http.post(endPoint, { data: info }, { headers: this.header }
    );
  }

  // get
  obtenerImagen(idImagen) {
    const endPoint = environment.heroku + `/api/get/${idImagen}`;
    return this.http.get(endPoint, {
      headers: this.header
    });
  }

  // delete
  borrarImagen(idImagen: any) {
    const endPoint = environment.heroku + `/api/delete/${idImagen}`;
    return this.http.delete(endPoint, {
      headers: this.header
    });
  }

  // update
  actualizarImagen(info: any) {
    const endPoint = environment.heroku + '/api/update';
    return this.http.post(endPoint, { data: info }, { headers: this.header }
    );
  }


}
