import { Component, OnInit } from '@angular/core';
import { DriverData } from 'src/app/models/DriverData';
import { DriverRace } from 'src/app/models/DriverRace';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {
  driverData : DriverData = new DriverData;
  driverPositions : Array<DriverRace> = [];
  
  constructor(private infoPage : InfoService) 
  { 
    this.infoPage.getCurrentDriver().subscribe(
      driver => this.driverData = driver
    );  //<-
    this.driverPositions = this.driverData.races;
 

  }

  ngOnInit(): void {
    
  }

  changeDriver (driver: any){
     
    this.infoPage.getInfoDriver(driver).subscribe(
      driver => this.driverData =driver
    );  
    this.driverPositions = this.driverData.races;
    alert (this.driverData.name);
  }

}
