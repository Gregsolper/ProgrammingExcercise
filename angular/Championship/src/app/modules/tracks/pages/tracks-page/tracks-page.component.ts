import { Component, OnInit } from '@angular/core';
import { DriverData } from 'src/app/models/DriverData';
import { DriverRace } from 'src/app/models/DriverRace';
import { RaceData } from 'src/app/models/RaceData';
import { RaceDriver } from 'src/app/models/RaceDriver';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent implements OnInit {
  driverShow : DriverData = new DriverData;
  //@HostBinding ('class.is-open')
  //isOpen=false;

  driverData : DriverData = new DriverData;
  driverPositions : Array<DriverRace> = []

  constructor(private infoPage: InfoService) { }

  ngOnInit(): void {
    this.driverData = this.infoPage.getInfoDriver("");
    this.driverPositions = this.driverData.races;
  }

  changeDriver (driver: any){
    this.driverData = this.infoPage.getInfoDriver(driver);
    this.driverPositions = this.driverData.races;
    alert (this.driverData.name);
  }


}
