import { Component, OnInit, Output } from '@angular/core';
import { InfoService } from 'src/app/services/info.service';
import { RaceData } from 'src/app/models/RaceData';
import { DriverComponent } from '../driver/driver/driver.component';
import { CommunicationService } from 'src/app/services/communication.service';
import { ViewCoordinationService } from 'src/app/services/view-coordination.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
  typeReport: String = "Global";
  viewRaces: Array<RaceData> = [];
  driversList: Array<any> = []
  raceShow : RaceData = new RaceData;
  selectedDriver : string ='';
  currentView : string ='';

  constructor(private infoPage : InfoService, 
              private communicationService : CommunicationService,
              private viewCoordination : ViewCoordinationService) {
    this.infoPage.getInfoRace("Global").subscribe(
      race => this.raceShow = race
    );
    this.driversList = this.raceShow.RaceDriver;
    this.selectedDriver = this.driversList[0].name;
    this.initSelectDriver(this.selectedDriver);
   }

  ngOnInit(): void {
    this.infoPage.getInfoRacesChampionShip().subscribe (
      races => this.viewRaces = races
    );
    this.communicationService.sendMessageObservable.subscribe (
      message => this.selectedDriver = message
    );
    this.viewCoordination.sendMessageObservable.subscribe ( 
      view => this.currentView = view
    );
  
    
  }

  onSelectRace(state : any){
    if (state.target.value !='--select race to view--') {
      this.typeReport = state.target.value;
      this.infoPage.getInfoRace(this.typeReport).subscribe(
        race=> this.raceShow = race
      );
      this.driversList = this.raceShow.RaceDriver;
    }
  }

  onSelectDriver ( driver:string){
      this.communicationService.sendMessage (driver);
      this.infoPage.setCurrentDriver (driver);
      this.viewCoordination.sendMessage('driver');
  }

  initSelectDriver ( driver:string){
    this.communicationService.sendMessage (driver);
    this.infoPage.setCurrentDriver (driver);
  }

}
