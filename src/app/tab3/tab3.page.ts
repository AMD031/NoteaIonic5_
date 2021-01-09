import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';





@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  rImg: string = 'assets/img/user.svg';
  constructor( public authS: AuthService) {
  
  }

  ngOnInit() {
  
  }

 
}





