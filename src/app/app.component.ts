import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { CargaconfService } from './services/cargaconf.service';
import { TranslateService } from '@ngx-translate/core';
import { TemasService } from './services/temas.service';
import { MensajesService } from './services/mensajes.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authS: AuthService,
    private translate: TranslateService,
    private temaS: TemasService,
    public mensaje: MensajesService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.translate.setDefaultLang('es');
    this.temaS.enableLight();
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.authS.init();
 
    });
  }
}

