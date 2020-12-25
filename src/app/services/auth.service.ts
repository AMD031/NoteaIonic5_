import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Preferencias } from '../model/preferencias';
import { TemasService } from './temas.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  public user = {
    token: -1,
    name: '',
    avatar: '',
    email: '',
  };

  constructor(
    private storage: NativeStorage,
    public google: GooglePlus,
    private router: Router,
    private translate: TranslateService,
    private plataforma: Platform,
    private temaS: TemasService
  ) {
  }

  async init() {
    this.translate.setDefaultLang('es');
    // console.log('AL INICIO DE LOS TIEMPOS')
    let u = null;
    try {
      u = await this.storage.getItem('user');
    } catch (err) {
      u = null;
    }
    if (u != null) {
      this.user = u;
    }
  }

  public isLogged(): boolean {
    console.log(this.user['token']);
    if (this.user.token === -1) {
      return false;
    } else {
      return true;
    }
  }



  public async logout() {
    let us = await this.google.trySilentLogin({});
    if (us) {
      let u = await this.google.logout();
    }
    this.user = {
      token: -1,
      name: '',
      avatar: '',
      email: '',
    };
    await this.storage.setItem('user', this.user);
  }

  public async login() {
    try {
      const u = await this.google.login({});
      if (u) {
        // console.log(JSON.stringify(u)); 
        // console.log('OK')
        this.user = {
          token: u['accessToken'],
          name: u['displayName'],
          avatar: u['imageUrl'],
          email: u['email']
        };
        // console.log(this.user);
      }
    } catch (err) {
      console.log(err);
      this.user = {
        token: -1,
        name: '',
        avatar: '',
        email: ''
      };

    }
    await this.storage.setItem('user', this.user);
    return this.user;
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // console.log('ESTOY EN CANACTIVATE Y EL RESULT ES ' + this.isLogged())
    if (!this.isLogged()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
