import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RoutesConfig } from 'src/app/configs/routes.config';

@Component({
  selector: 'app-cookies-management',
  templateUrl: './cookies-management.component.html',
  styleUrls: ['./cookies-management.component.scss']
})
export class CookiesManagementComponent implements OnInit {


  public yourForm: FormGroup;
  valueofcookie:string;
  isSubmitted = false;
  form: NgForm;
  constructor( private cookieService: CookieService,  private fromBuilder: FormBuilder, private router: Router) {
    {
      this.yourForm= this.fromBuilder.group({
        cookiesfirst: this.fromBuilder.control('true'),
        cookiessecond: this.fromBuilder.control('true'),

      })
  }
   }

  ngOnInit(): void {
    if(this.cookieService.get('IS_COOKIE_FIRTS')){
      // this.valueofcookie=this.cookieService.get('IS_COOKIE_FIRTS');
      // this.valueofcookie=this.cookieService.get('IS_COOKIE_SECOND');

      this.yourForm.controls.cookiesfirst.setValue(this.cookieService.get('IS_COOKIE_FIRTS'));
      this.yourForm.controls.cookiessecond.setValue(this.cookieService.get('IS_COOKIE_SECOND'));

    }
  }

  
  submitForm() {
    this.cookieService.set('IS_COOKIE_FIRTS', this.yourForm.get('cookiesfirst').value);
      this.cookieService.set('IS_COOKIE_SECOND', this.yourForm.get('cookiessecond').value);
    this.isSubmitted = true;
    this.router.navigate(['/']);
    
  }
  CancelClick()
  {
    this.router.navigate(['/']);
  }
}
