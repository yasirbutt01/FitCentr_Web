import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../../../app/modules/core/models/ResponseModel.model';
import { ItemObject } from '../../../app/modules/core/models/common.model';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.api.baseUrl;
  }

  getservices() {
    return this.http.get<ResponseModel<ItemObject<number>[]>>(`${this.baseUrl}/api/FitnessTrainerForm/getservices`);
  }

  getexperties() {
    return this.http.get<ResponseModel<ItemObject<string>[]>>(`${this.baseUrl}/api/FitnessTrainerForm/getexperties`);
  }


  getFitnessClassServices()
  {
    return this.http.get<ResponseModel<ItemObject<string>[]>>(`${this.baseUrl}/api/FitnessClassForm/getservices`);

  }
  getFitnessClassWorkOut()
  {
    return this.http.get<ResponseModel<ItemObject<string>[]>>(`${this.baseUrl}/api/FitnessClassForm/getworkouts`);

  }
  getFitnessGymamenities()
  {
    return this.http.get<ResponseModel<ItemObject<string>[]>>(`${this.baseUrl}/api/FitnessGymForm/getamenities`);

  }

  getFitnessNutritionFormServices()
  {
    return this.http.get<ResponseModel<ItemObject<string>[]>>(`${this.baseUrl}/api/FitnessNutritionForm/getservices`);

  }
  getFitnessNutritionFromallergies()
  {
    return this.http.get<ResponseModel<ItemObject<string>[]>>(`${this.baseUrl}/api/FitnessNutritionForm/getallergies`);

  }
  getFitnessNutritionGetDiets()
  {
    return this.http.get<ResponseModel<ItemObject<string>[]>>(`${this.baseUrl}/api/FitnessNutritionForm/getdiets`);

  }
getFitnessAppServices()
{
  return this.http.get<ResponseModel<ItemObject<string>[]>>(`${this.baseUrl}/api/FitnessAppForm/getservices`);

}
getFitnessAppWorkout()
{
  return this.http.get<ResponseModel<ItemObject<string>[]>>(`${this.baseUrl}/api/FitnessAppForm/getworkouts`);

}
}
