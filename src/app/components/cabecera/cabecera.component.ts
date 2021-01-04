import { Component, Inject, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ElementoAlert } from 'src/app/model/elementoAlert';
import { AuthService } from 'src/app/services/auth.service';
import { MensajesService } from 'src/app/services/mensajes.service';
import { TemasService } from 'src/app/services/temas.service';


@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss'],
})
export class CabeceraComponent implements OnInit {
  @Input('menu') menu: boolean = true;
  rImg: string = 'assets/img/user.svg';
  constructor(
    public authS: AuthService,
    private router: Router,
    private mensaje: MensajesService,
    private translate: TranslateService,
   ) {
  }

  public async logout() {
    try {
      await this.authS.logout();
      if (!this.authS.isLogged()) {
        this.router.navigate(['/login']);
      }
    } catch (error) {
      await this.mensaje.presentToast(this.translate.instant('logout.errorLogout.'), 'danger');
      console.log('login: ', error);
    }
  }




  ngOnInit() { }






}
