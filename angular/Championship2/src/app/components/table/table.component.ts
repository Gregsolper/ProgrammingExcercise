import { Component, OnInit, Output } from '@angular/core';
import { InfoService } from 'src/app/services/info.service';
import { RaceData } from 'src/app/models/RaceData';
import { DriverComponent } from '../driver/driver/driver.component';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
  typeReport: String = "Global";
  allRaces: Array<any> = [];
  driversList: Array<any> = []
  raceShow : RaceData = new RaceData;
  //raceView : Boolean = true;
 // @Input() driverPage : DriverComponent = new DriverComponent(this.infoPage);


  constructor(private infoPage : InfoService) {
    this.infoPage.getInfoRace("Global").subscribe(
      race => this.raceShow = race
    );
    this.driversList = this.raceShow.RaceDriver;
   }

  ngOnInit(): void {
    //this.allRaces= 
    this.infoPage.getInfoRacesChampionShip().subscribe (
      races => this.allRaces = races
    );
  }

  onSelectRace(state : any){
    console.log(state.target.value);
    this.typeReport = state.target.value;
     
    this.infoPage.getInfoRace(this.typeReport).subscribe(
      race=> this.raceShow = race
    );
    this.driversList = this.raceShow.RaceDriver;
    
  }
  //@Output() messageEvent = new EventEmitter();

  onSelectDriver ( driver:any){
    this.infoPage.setCurrentDriver (driver);
//    this.raceView = false;
    //this.messageEvent.emit (driver);
    //this.driverPage.changeDriver(driver);   
  }

}
