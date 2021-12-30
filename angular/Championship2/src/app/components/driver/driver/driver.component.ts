import { Component, OnInit } from '@angular/core';
import { DriverData } from 'src/app/models/DriverData';
import { DriverRace } from 'src/app/models/DriverRace';
import { CommunicationService } from 'src/app/services/communication.service';
import { InfoService } from 'src/app/services/info.service';
import { ViewCoordinationService } from 'src/app/services/view-coordination.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {
  driverData : DriverData = new DriverData;
  driverPositions : Array<DriverRace> = [];
  driverSelected : string ='';
  currentView : string ='';

  constructor(private infoPage : InfoService,
     private communicationService : CommunicationService,
     private viewCoordination : ViewCoordinationService) 
  { 
   this.infoPage.getCurrentDriver().subscribe(
    driver => this.driverData = driver
  ); 
   
  }

  ngOnInit(): void {
   
    this.communicationService.sendMessageObservable.subscribe (
      driverMessage => {
        this.changeDriver(driverMessage);
    });
    this.viewCoordination.sendMessageObservable.subscribe (
      view => this.currentView = view
      
    );
  }

  changeDriver (driverName: string){
     
    this.infoPage.getInfoDriver(driverName).subscribe(
      driverInfo => this.driverData =driverInfo
    );  
    this.driverPositions = this.driverData.races;
    this.driverSelected = this.driverData.name;
  }

  changeView (){
    this.viewCoordination.sendMessage('race');
  }

}
