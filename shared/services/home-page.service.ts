import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from 'src/app/modules/core/models/ResponseModel.model';
import { LandingCardModel } from 'src/app/modules/core/models/common.model';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.api.baseUrl;
  }

  getlandingslidercards(profileTypeId: string, skip: number, take: number) {
    return this.http.get<ResponseModel<LandingCardModel[]>>(
      `${this.baseUrl}/api/Landing/getlandingslidercards/${profileTypeId}/${skip}/${take}`);
  }
}
