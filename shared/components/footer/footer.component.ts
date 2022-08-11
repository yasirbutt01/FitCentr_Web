import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { ROUTES_CONFIG, RoutesConfig } from 'src/app/configs/routes.config';
import { Router } from '@angular/router';
import { AppSearchingDataService } from 'src/app/modules/app-searching/shared/app-searching-data.service';
import { ESearchType, ETrainerExpertyType } from 'src/app/modules/app-searching/shared/app-searching.model';
import { LoginService } from 'src/app/modules/account/shared/login.service';
import { Base64 } from 'js-base64';



@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {
  eSearchType = ESearchType;
  eTrainerExpertyType = ETrainerExpertyType;
  public isLoggedin = false;

  constructor(@Inject(ROUTES_CONFIG) public routesConfig: any,
              public router: Router,
              private loginService: LoginService,
              private appSearchingDataService: AppSearchingDataService, private renderer: Renderer2
  ) {
  }

  goToAppSearch(item, breadcrumb): string {
    item.breadcrumb = breadcrumb;
    // this.appSearchingDataService.changeMessage(item);
    const urlId = Base64.encode(JSON.stringify(item));
    return urlId;
    // this.router.navigate([RoutesConfig.routes.appSearching.main + '/' + urlId]);
  }
  ngOnInit() {
    this.isLoggedin = this.loginService.isLoggedIn();
  }
}
