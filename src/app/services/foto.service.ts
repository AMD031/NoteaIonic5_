import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Injectable({
  providedIn: 'root'
})
export class FotoService {
  constructor(private camera: Camera) { }
 
  tomarfoto(
    calidad: number,
    ): Promise<any>{
    const options: CameraOptions = {
      quality: calidad,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      // sourceType: this.camera.PictureSourceType.CAMERA
    };
    
    return this.camera.getPicture(options);
  }


}
