import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class HeaderSharingService {

  private messageSource = new BehaviorSubject({});
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: any) {
    this.messageSource.next(message);
  }

}
