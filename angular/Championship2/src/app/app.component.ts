import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from './components/table/table.component';
import { CommunicationService } from './services/communication.service';
import { ViewCoordinationService } from './services/view-coordination.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
}) 
/**
 * This is a programming Excercise.  Specifications are published by NTTDATA
 * 
 * In this version the data can be found in the data folder. 
 * In a next version they should come from a server. For this reason, 
 * some points where the changes will be made have been indicated in the "info.service" Service. 
 * As well as eliminating the data processing programming that is currently in JavaScript.
 * 
 * To coordinate the components, the services of "view-coordination.service" is used,
 * to make visible only the component that is used.
 * This could be done using pages. And make some changes to the html page to jump to another page.
 * 
 * To inform about the selected driver, the service "communication.service" is used.
 * 
 * Edited using IDE Visual Code Community version 
 * Programmer: Gregorio Solis Pèrez
 * January 2022.
 * 
 */


export class AppComponent implements OnInit {
  
  currentView : string ='';
  title = 'Championship 2021';
  constructor (private viewCoordination : ViewCoordinationService ){}
  
  ngOnInit(): void {
    this.viewCoordination.sendMessageObservable.subscribe ( 
      view => this.currentView = view);
      this.changeView('race');
  }

  changeView ( message : string) {
    this.viewCoordination.sendMessage (message);
  }
}
