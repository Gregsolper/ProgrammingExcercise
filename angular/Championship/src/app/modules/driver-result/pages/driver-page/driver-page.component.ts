import { Component, HostBinding, OnInit } from '@angular/core';
import { DriverData } from 'src/app/models/DriverData';
import { DriverRace } from 'src/app/models/DriverRace';
import { RaceData } from 'src/app/models/RaceData';
import { RaceDriver } from 'src/app/models/RaceDriver';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'app-driver-page',
  templateUrl: './driver-page.component.html',
  styleUrls: ['./driver-page.component.css']
})
export class DriverPageComponent implements OnInit {

  driverShow : DriverData = new DriverData;
  @HostBinding ('class.is-open')
  isOpen=false;

  constructor(private infoPage: InfoService) { }
  driverData : DriverData = new DriverData;
  driverPositions : Array<DriverRace> = []

  ngOnInit(): void {
    //this.driverData = 
    this.infoPage.getInfoDriver("").subscribe(
      driver => this.driverData = driver
    );  //<-
    this.driverPositions = this.driverData.races;
  }

  changeDriver (driver: any){
     
    this.infoPage.getInfoDriver(driver).subscribe(
      driver => this.driverData =driver
    );  
    this.driverPositions = this.driverData.races;
    alert (this.driverData.name);
    this.isOpen= true;
  }
}
