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
  constructor(private translate: TranslateService , private http: HttpClient){
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


   private get header(): any {
    return {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    };
  }

  onClick(){
    this.http.post('https://api1010.herokuapp.com/api/upload', {
      data: this.data
     },
     { headers: this.header

     }).subscribe(
      (resp) =>{
        console.log(resp);
      });

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

  private data = "data:image/jpeg;base64,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";

}
