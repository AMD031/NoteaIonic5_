import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
// import { TranslateService } from '@ngx-translate/core';
// import { Globalization } from '@ionic-native/globalization/ngx';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  // public title: string;
  // public title_2: string;
  // public description: string;
  // public name: string;
  // public language: string;

  // constructor(private globalization: Globalization, private _translate: TranslateService) {}

  valor = false;
  constructor(private translate: TranslateService, private http: HttpClient) {
    // this.translate.getTranslation('es').subscribe(
    //   (res) =>{
    //     alert(JSON.stringify(res));
    //   },
    //   (err) => {
    //     alert(JSON.stringify);
    //   }
    // )
    // this.translate.setDefaultLang('en');

    //  this.translate.get( ['TITLE', 'description' ]).subscribe((res: string) => {
    //     alert(JSON.stringify(res));
    //   });
  }



  // ionViewDidEnter(): void {
  //   this.getDeviceLanguage()
  // }

  // _initialiseTranslation(): void {
  //   this._translate.get( ['TITLE' ]).subscribe((res: string) => {
  //     this.title = res;
  //   });
  //   this._translate.get('description').subscribe((res: string) => {
  //     this.description = res;
  //   });
  //   this._translate.get('TITLE_2', { value: 'John' }).subscribe((res: string) => {
  //     this.title_2 = res;
  //   });
  //   this._translate.get('data.name', { name_value: 'Marissa Mayer' }).subscribe((res: string) => {
  //     this.name = res;
  //   });

  // }

  // public changeLanguage(): void {
  //   this._translateLanguage();
  // }

  // _translateLanguage(): void {
  //   this._translate.use(this.language);
  //   this._initialiseTranslation();
  // }


  // _initTranslate() {
  //   // Set the default language for translation strings, and the current language.
  //   this._translate.setDefaultLang('en');

  //   if (this._translate.getBrowserLang() !== undefined) {
  //     this.language = this._translate.getBrowserLang();
  //     console.log('browser language is', this._translate.getBrowserLang());
  //   }
  //   else {
  //     // Set your language here
  //     this.language = 'en';
  //   }

  //   this._translateLanguage();
  // }

  // getDeviceLanguage() {
  //   if (window.Intl && typeof window.Intl === 'object') {
  //     this._initTranslate(navigator.language)
  //   }
  //   else {
  //     this.globalization.getPreferredLanguage()
  //       .then(res => {
  //         console.log(res.value);

  //         this._initTranslate(res.value)
  //       })
  //       .catch(e => { console.log(e); });
  //   }
  // }


}
