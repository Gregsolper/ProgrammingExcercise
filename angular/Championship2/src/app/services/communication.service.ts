import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  menssage : string="";

  private sendMessageSubject = new Subject<string>();
  sendMessageObservable = this.sendMessageSubject.asObservable();

  sendMessage ( message: string) {
    this.menssage = message;
    this.sendMessageSubject.next(message);
  }
  
  constructor() { }
}
