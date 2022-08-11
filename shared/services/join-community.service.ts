import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JoinCommunityService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.api.baseUrl;
  }

  getUsers() {
    // return this.http.get<IUser[]>(`${this.baseUrl}/api/users`);
  }
}
