import { Component, Input, OnInit } from '@angular/core';
import { DriverPageComponent } from '@modules/driver-result/pages/driver-page/driver-page.component';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { DriverData } from 'src/app/models/DriverData';
import { DriverRace } from 'src/app/models/DriverRace';
import { RaceData } from 'src/app/models/RaceData';
import { RaceDriver } from 'src/app/models/RaceDriver';
import { InfoService } from 'src/app/services/info.service';
//import { Option } from 'src/app/models/Option'; //add

interface Option {
  id : String;
  name : String;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']

})



export class HomePageComponent implements OnInit {
  //testData: String = "";
  //drivers: Array<DriverData> = [];
  //races: Array<RaceData> = [];
  //raceCategories$: Observable<Option[]> = new Observable;

  typeReport: String = "Global";
  allRaces: Array<any> = [];
  driversList: Array<any> = []
  raceShow : RaceData = new RaceData;

  
  @Input() driverPage : DriverPageComponent = new DriverPageComponent(this.infoPage);

  
  

  constructor(private infoPage: InfoService) { 
      this.raceShow = this.infoPage.getInfoRace("Global");
      this.driversList = this.raceShow.RaceDriver;
  }  


  ngOnInit(): void {

    
    //this.driversList = this.infoPage.getInfoChampionShip();
    this.allRaces= this.infoPage.getInfoRacesChampionShip();
    //this.raceCategories$ = this.infoPage.getRaceOption$();
  }

  onSelectRace(state : any){
    console.log(state.target.value);
    this.typeReport = state.target.value;
    this.raceShow = this.infoPage.getInfoRace(this.typeReport);
    this.driversList = this.raceShow.RaceDriver;
    
  }

  onSelectDriver ( driver:any){
    console.log(driver);
    this.driverPage.changeDriver(driver);   
  }
  

}


