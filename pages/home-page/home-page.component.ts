import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { HomePageService } from 'src/app/shared/services/home-page.service';
import { EProfileType, LandingCardModel } from 'src/app/modules/core/models/common.model';
import { environment } from 'src/environments/environment';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { ROUTES_CONFIG } from 'src/app/configs/routes.config';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {

  public eProfileType = EProfileType;

  public businessFitnessGymSlides: LandingCardModel[] = [];
  public fitnessTrainnerSlides: LandingCardModel[] = [];
  public fitnessAppSlides: LandingCardModel[] = [];
  public businessFitnessNeutrationAppSlides: LandingCardModel[] = [];
  // tslint:disable-next-line:max-line-length

  sliderImages: any[] = [
    { imageUrl: 'https://d1tp4oo85srdcq.cloudfront.net/slide-1.png', title: ' <b>GET FIT &amp; STAY FIT</b><span>NO MATTER WHERE YOU ARE</span>', description: 'from Gyms to Fitness Classes and more.' },
    { imageUrl: 'https://d1tp4oo85srdcq.cloudfront.net/slide-2.png', title: 'MEET OUR <b>  FITNESS TRAINERS</b> <span>WHO OFFER BOTH VIRTUAL AND IN-PERSON TRAINING<br> ACROSS A VARIETY OF SPECIALITIES</span>', description: 'who offer both virtual and in-person training across a variety of specialties' },
    { imageUrl: 'https://d1tp4oo85srdcq.cloudfront.net/slide-3.png', title: 'COMPARE  <b>FITNESS APPS</b> BY <br><span>TRAINING SPECIALTIS, VIRTUAL SERVICES<br> AND MEMBERSHIP PRICES</span>' },
    { imageUrl: 'https://d1tp4oo85srdcq.cloudfront.net/slide-4.png', title: 'DISCOVER <b>GYMS, CLASSES</b> AND <b>STUDIOS</b> ONLINE AND NEAR YOU ', description: 'training specialties, virtual services and membership prices' },  
    { imageUrl: 'https://d1tp4oo85srdcq.cloudfront.net/slide-5.png', title: 'EXPLORE <b>HEALTH & NUTRITION APPS</b> THAT OFFER <br>A VARIETY OF SERVICES, SUCH AS NUTRITION ADVICE,<br> FOOD DELIVERY, RECIPES, MEAL PLANS AND MORE', description: 'that accommodate for many dietary preferences and offer a variety of services such as nutrition advice, food delivery, recipes, meal plans and more.' }];

  // slides = [
  // { img: 'http://placehold.it/258x258/000000' },
  // { img: 'http://placehold.it/258x258/111111' },
  // { img: 'http://placehold.it/258x258/333333' },
  // { img: 'http://placehold.it/258x258/333333' },
  // { img: 'http://placehold.it/258x258/666666' }
  // ];
  slideConfig = { slidesToShow: 4, slidesToScroll: 4 };

  public baseUrl: string;

  constructor(private homeService: HomePageService, config: NgbCarouselConfig,
    @Inject(ROUTES_CONFIG) public routesConfig: any,) {
    this.baseUrl = environment.api.baseUrl;
    config.interval = 2000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  ngOnInit() {
    this.getBusinessFitnessGymSlides();
    this.getBusinessFitnessNeutrationAppSlides();
    this.getFitnessAppSlides();
    this.getFitnessTrainnerSlides();

    // for (const item in EProfileType) {
    //   if (!isNaN(Number(item))) {
    //     const toNumber = Number(item);
    //     this.personalInformationModel.privacies.push({ isPublic: false, privacyTypeId: toNumber });
    //   }
    // }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth < 800) {
      this.slideConfig = { slidesToShow: 2, slidesToScroll: 2 };
    } else {
      this.slideConfig = { slidesToShow: 4, slidesToScroll: 4 };

    }
  }

  getBusinessFitnessGymSlides(): void {
    this.homeService.getlandingslidercards(this.eProfileType.BusinessFitnessGym, 0, 10).subscribe(x => {
      this.businessFitnessGymSlides = x.data;
      this.businessFitnessGymSlides.forEach(element => {
        element.eProfileTypeId =
          EProfileType[this.getEnumKeyByEnumValue(EProfileType, element.profileTypeId?.toUpperCase())];
      });
    });
  }

  getEnumKeyByEnumValue(myEnum, enumValue) {
    const keys = Object.keys(myEnum).filter(x => myEnum[x].toUpperCase() == enumValue);
    return keys.length > 0 ? keys[0] : null;
  }

  getFitnessTrainnerSlides(): void {
    this.homeService.getlandingslidercards(this.eProfileType.FitnessTrainner, 0, 10).subscribe(x => {
      this.fitnessTrainnerSlides = x.data;

    });
  }

  getFitnessAppSlides(): void {
    this.homeService.getlandingslidercards(this.eProfileType.FitnessApp, 0, 10).subscribe(x => {
      this.fitnessAppSlides = x.data;
    });
  }

  getBusinessFitnessNeutrationAppSlides(): void {
    this.homeService.getlandingslidercards(this.eProfileType.BusinessFitnessNeutrationApp, 0, 10).subscribe(x => {
      this.businessFitnessNeutrationAppSlides = x.data;

    });
  }

  // addSlide() {
  //   this.slides.push({ img: 'http://placehold.it/350x150/777777' });
  // }
  // removeSlide() {
  //   this.slides.length = this.slides.length - 1;
  // }
  slickInit(e) {
    console.log('slick initialized');
  }
  breakpoint(e) {
    console.log('breakpoint');
  }
  afterChange(e) {
    console.log('afterChange');
  }
  beforeChange(e) {
    console.log(e);
  }

}
