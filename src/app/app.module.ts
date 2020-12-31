import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { NotasService } from './services/notas.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AuthService } from './services/auth.service';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { GeoService } from './services/geo.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { VibraService } from './services/vibra.service';
import { HTTP } from '@ionic-native/http/ngx';
import { TranslateModule, TranslateLoader,TranslatePipe } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { MenuPage } from './pages/menu/menu.page';
import { FotoService } from './services/foto.service';
import { Camera} from '@ionic-native/camera/ngx';




export function setTranslateLoader(http: any) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    MenuPage,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: setTranslateLoader,
        deps: [HttpClient]
      }
    }),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AppRoutingModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NotasService,
    VibraService,
    NativeStorage,
    GooglePlus,
    AuthService,
    GeoService,
    Geolocation,
    Vibration,
    LocationAccuracy,
    GeoService,
    FotoService,
    Camera,
    HTTP,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
