import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cookies-policy',
  templateUrl: './cookies-policy.component.html',
  styleUrls: ['./cookies-policy.component.scss']
})
export class CookiesPolicyComponent implements OnInit {

  valueofcookie:string;
  isSubmitted = false;
  form: NgForm
  constructor( private cookieService: CookieService) { }

  ngOnInit(): void {
    if(this.cookieService.get('IS_COOKIE_FIRTS')){
      this.valueofcookie = this.cookieService.get('IS_COOKIE_FIRTS');
      //this.form.value.cookiessecond = this.cookieService.get('IS_COOKIE_SECOND');

    }
  }

  
  submitForm(form: NgForm) {
    this.isSubmitted = true;
    if(!form.valid) {
      return false;
    } else {
      debugger;
      this.cookieService.set('IS_COOKIE_FIRTS', form.value.cookiesfirst);
      this.cookieService.set('IS_COOKIE_SECOND', form.value.cookiessecond);
    }
  }

}
