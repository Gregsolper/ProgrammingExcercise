import { Component, Input, OnInit } from '@angular/core';
import { DriverPageComponent } from '@modules/driver-result/pages/driver-page/driver-page.component';
import { RaceData } from 'src/app/models/RaceData';
import { InfoService } from 'src/app/services/info.service';

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
  typeReport: String = "Global";
  allRaces: Array<any> = [];
  driversList: Array<any> = []
  raceShow : RaceData = new RaceData;

  @Input() driverPage : DriverPageComponent = new DriverPageComponent(this.infoPage);

  constructor(private infoPage: InfoService) { 
      //this.raceShow = 
      this.infoPage.getInfoRace("Global").subscribe(
        race => this.raceShow = race
      );
      this.driversList = this.raceShow.RaceDriver;
  }  


  ngOnInit(): void {
    this.allRaces= this.infoPage.getInfoRacesChampionShip();
  }

  onSelectRace(state : any){
    console.log(state.target.value);
    this.typeReport = state.target.value;
     
    this.infoPage.getInfoRace(this.typeReport).subscribe(
      race=> this.raceShow = race
    );
    this.driversList = this.raceShow.RaceDriver;
    
  }

  onSelectDriver ( driver:any){
    console.log(driver);
    this.driverPage.changeDriver(driver);   
  }
  

}


