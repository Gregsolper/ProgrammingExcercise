import { Component, OnInit } from '@angular/core';
import { DriverData } from 'src/app/models/DriverData';
import { DriverRace } from 'src/app/models/DriverRace';
import { CommunicationService } from 'src/app/services/communication.service';
import { InfoService } from 'src/app/services/info.service';
import { ViewCoordinationService } from 'src/app/services/view-coordination.service';

/**
 * Component dedicated to displaying drivers'data and 
 * his position in each championship's race
 * @see AppComponent
 * @see TableComponent
 * December 2021.
 */
@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {
  /** set of Drivers @see src/app/models/DriverData */
  driverData : DriverData = new DriverData;
  /** selected driver's name */
  driverSelected : string ='';
  /** is used to coordinate the current commponent */
  currentView : string ='';

  /**
   * Build component with the current driver information
   * @param infoPage data service
   * @param communicationService is used to know the current driver
   * @param viewCoordination to coordinate current viewed component
   */
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
  /**
   * Get driver current information
   * @param driverName 
   */
  changeDriver (driverName: string){
     
    this.infoPage.getInfoDriver(driverName).subscribe(
      driverInfo => this.driverData =driverInfo
    );  
    this.driverSelected = this.driverData.name;
  }
  /**
   * Inform the commponent to see on screen
   */
  changeView (){
    this.viewCoordination.sendMessage('race');
  }

}
