import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * Service used to send information between componentes
 * in particular useful to inform driver selected form table.component 
 * to driver.component
 */
export class CommunicationService {
  message : string="";

  private sendMessageSubject = new Subject<string>();
  sendMessageObservable = this.sendMessageSubject.asObservable();

  sendMessage ( message: string) {
    this.message = message;
    this.sendMessageSubject.next(message);
  }
  
  constructor() { }
}
