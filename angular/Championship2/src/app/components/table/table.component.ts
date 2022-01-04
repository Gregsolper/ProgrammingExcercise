import { Component, OnInit, Output } from '@angular/core';
import { InfoService } from 'src/app/services/info.service';
import { RaceData } from 'src/app/models/RaceData';
import { DriverComponent } from '../driver/driver/driver.component';
import { CommunicationService } from 'src/app/services/communication.service';
import { ViewCoordinationService } from 'src/app/services/view-coordination.service';

/**
 * Component dedicated to displaying the list of drivers' positions
 * in the championship or in a given race.
 * @see AppComponent
 * @see DriverComponent
 * December 2021.
 */
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
  /**
   * Construct the initial values
   * @param infoPage Service to get Information
   * @param communicationService Service to inform current driver
   * @param viewCoordination Service to coordinate current viewed component
   */
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
  /**
   * Get the information of selected race
   * @param state Becomes form html page is the seleted race
   */
  onSelectRace(state : any){
    if (state.target.value !='--select race to view--') {
      this.typeReport = state.target.value;
      this.infoPage.getInfoRace(this.typeReport).subscribe(
        race=> this.raceShow = race
      );
      this.driversList = this.raceShow.RaceDriver;
    }
  }
  /**
   * informs the selected driver to the components, 
   * and to the data collection service as well as indicates
   *  that it is required to make the "driver" component visible
   * @param driver driver selected 
   */
  onSelectDriver ( driver:string){
      this.communicationService.sendMessage (driver);
      this.infoPage.setCurrentDriver (driver);
      this.viewCoordination.sendMessage('driver');
  }
  /**
   * It is used by the constructor to start with the information of the current driver
   * @param driver first driver to view
   */
  initSelectDriver ( driver:string){
    this.communicationService.sendMessage (driver);
    this.infoPage.setCurrentDriver (driver);
  }

}
