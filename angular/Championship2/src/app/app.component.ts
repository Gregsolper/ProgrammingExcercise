import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from './components/table/table.component';
import { CommunicationService } from './services/communication.service';
import { ViewCoordinationService } from './services/view-coordination.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
}) 


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
