import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-driver-page',
  templateUrl: './driver-page.component.html',
  styleUrls: ['./driver-page.component.css']
})
export class DriverPageComponent implements OnInit {

  constructor() { }
  driverData : any
  driverPositions : Array<any> = []

  ngOnInit(): void {
    this.driverData = {
      fotoUrl : '',
      name :'Lucianni',
      age : 40,
      team : 'Everis',
      globalRanking : 6

    }
    this.driverPositions = [
      {
        race: 'GP Barein',
        racePosition : 5,
        raceTime : '1:48:28.75'
      },
      {
        race: 'GP Barein',
        racePosition : 5,
        raceTime : '1:48:28.75'
      },
      {
        race: 'GP Barein',
        racePosition : 5,
        raceTime : '1:48:28.75'
      },
      {
        race: 'GP Barein',
        racePosition : 5,
        raceTime : '1:48:28.75'
      }

    ] 
  }

}
