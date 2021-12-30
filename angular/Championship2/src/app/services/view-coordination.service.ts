import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewCoordinationService {
  message : string ='';
  
  private sendMessageSubject = new Subject<string>();
  sendMessageObservable = this.sendMessageSubject.asObservable();

  sendMessage ( message: string) {
    this.message = message;
    this.sendMessageSubject.next(message);
  }
  
  
  
  
  constructor() { }
}
