import { Component, Inject, OnInit, HostListener, Renderer2, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { APP_CONFIG } from '../../../configs/app.config';
import { NavigationEnd, Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { CookieService } from '@gorniv/ngx-universal';
import { ProgressBarService } from '../../../modules/core/services/progress-bar.service';
import { ROUTES_CONFIG, RoutesConfig } from 'src/app/configs/routes.config';
import { HeaderService } from '../../services/header.service';
import { ESearchType, ETrainerExpertyType } from 'src/app/modules/app-searching/shared/app-searching.model';
import { AppSearchingDataService } from 'src/app/modules/app-searching/shared/app-searching-data.service';
import { LoginService } from 'src/app/modules/account/shared/login.service';
import { LoginResponseModel } from 'src/app/modules/account/shared/login.model';
import { Subscription } from 'rxjs';
import { EProfileType } from 'src/app/modules/core/models/common.model';
import { HeaderSharingService } from '../../services/header-sharing.service';
import { Base64 } from 'js-base64';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '(window:click)': 'onClick($event)'
  }
})

export class HeaderComponent implements OnInit {
  eSearchType = ESearchType;
  // @ViewChild('toggleButton') toggleButton: ElementRef;
  // @ViewChild('menu') menu: ElementRef;
  route: string;
  currentURL = '';
  selectedLanguage: string;
  progressBarMode: string;
  classApplied = false;
  currentUrl: string;

  languages: any[];
  scrollPosition: number;
  public user: LoginResponseModel;
  public href = '';
  public trainExpertities: any[] = [];
  public fitnessNutrationServices: any[] = [];
  public userEProfileType: EProfileType;
  public eProfileType = EProfileType;
  public eTrainerExpertyType = ETrainerExpertyType;
  isMenuOpen = false;
  isMenuwebOpen = false;

  constructor(@Inject(APP_CONFIG) public appConfig: any, @Inject(ROUTES_CONFIG) public routesConfig: any,
              private progressBarService: ProgressBarService,
              private cookieService: CookieService,
              private headerServices: HeaderService,
              public router: Router,
              private loginService: LoginService,
              private headerSharingService: HeaderSharingService,
              private ref: ChangeDetectorRef
    // private appSearchingDataService: AppSearchingDataService, private renderer: Renderer2, private _eref: ElementRef
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentURL = event.urlAfterRedirects;
      }
    });
    this.languages = [{ name: 'en', label: 'English' }, { name: 'es', label: 'Español' }];

  }
  toggleMenu($event) {
    $event.stopPropagation();
    this.isMenuwebOpen = !this.isMenuwebOpen;
  }
  toggleMenu1($event) {
    $event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
  }
  onClick($event) {
    this.isMenuwebOpen = false;
  }
  ngOnInit() {
    this.userEProfileType = this.loginService.getEUserProfileType();
    const promise2 = this.headerServices.getexperties().toPromise();
    const promise6 = this.headerServices.getFitnessNutritionFormServices().toPromise();

    // tslint:disable-next-line: max-line-length
    Promise.all([promise2, promise6]).then(([var2, var6]) => {


      this.trainExpertities = var2.data;
      this.trainExpertities.map((obj) => {
        obj.SearchType = ESearchType.TrainerSearch;
        return obj;
      });

      this.fitnessNutrationServices = var6.data;
      this.fitnessNutrationServices.map((obj) => {
        obj.SearchType = ESearchType.NutritionSearch;
        return obj;
      });

    });
    this.selectedLanguage = this.cookieService.get('language') || 'en';

    this.progressBarService.getUpdateProgressBar().subscribe((mode: string) => {
      this.progressBarMode = mode;
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });

    this.user = this.loginService.getUserInformation();

    this.headerSharingService.currentMessage.subscribe(message => {
      this.updateUserData(message);
    });
  }

  updateUserData(message) {
    if (message.imageThumbnailUrl && message.name) {
      this.user.imageThumbnailUrl = message.imageThumbnailUrl;
      this.user.name = message.name;
      this.cookieService.putObject('loginResponse', this.user);
    }
  }

  goToAppSearch(item, breadcrumb): string {
    item.breadcrumb = breadcrumb;
    // this.appSearchingDataService.changeMessage(item);
    const urlId = Base64.encode(JSON.stringify(item));
    return urlId;
    // this.router.navigate([RoutesConfig.routes.appSearching.main + '/' + urlId]);
  }

  goToHome(): void {
    this.router.navigate([RoutesConfig.routes.home]);
  }

  toggleClass() {
    this.classApplied = !this.classApplied;
  }

  getFitnessTrainers() {
    if (this.trainExpertities && this.trainExpertities.length > 0) {
      return this.trainExpertities.filter(x => x.type === ETrainerExpertyType.FitnessTrainers);0
    }
  }

  getSpacialityTrainers() {
    if (this.trainExpertities && this.trainExpertities.length > 0) {
      return this.trainExpertities.filter(x => x.type === ETrainerExpertyType.SpacialityTrainers);
    }
  }

  getMindBody() {
    if (this.trainExpertities && this.trainExpertities.length > 0) {
      return this.trainExpertities.filter(x => x.type === ETrainerExpertyType.MindBody);
    }
  }

  @HostListener('document:scroll')
  public onScroll() {
    this.scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
  }

  changeLanguage(language: string): void {
    this.cookieService.put('language', language);
    this.selectedLanguage = language;
  }

  onLogout() {
    this.loginService.logout();
  }
}
