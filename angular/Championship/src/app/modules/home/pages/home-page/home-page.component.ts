import { Component, OnInit } from '@angular/core';
import { race } from 'rxjs';
import { DriverData } from 'src/app/models/DriverData';
import { DriverRace } from 'src/app/models/DriverRace';
import { RaceData } from 'src/app/models/RaceData';
import { RaceDriver } from 'src/app/models/RaceDriver';
import { InfoService } from 'src/app/services/info.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']

})

export class HomePageComponent implements OnInit {

  typeReport: String = "Global"

  driversList: Array<any> = []
  testData: String = "";

  drivers: Array<DriverData> = [];
  races: Array<RaceData> = [];
  allRaces: Array<String> = [];

  constructor(public infoPage: InfoService) {
    //this.drivers = this.infoPage.getInfoChampionShip();
    //this.driversList = this.drivers;
    //this.buildRaceData();
  }


  buildRaceData() {
    count_driver: Number;
    count_race: Number;
    first: Boolean;
    let first = true;
    let count_driver = 0;

    //console.log("conductores");
    //this.drivers.forEach(d=>console.log(d.name));
    //console.log("carreras");
    //this.drivers[0].races.forEach (r=>console.log(r.name));
    //console.log("armando");

    this.createRaces();

    //console.log("---------------------------------------------------carreras--");
    //this.races.forEach(r=>{console.log(r.name+"---------------------------------------------------------");
    //r.RaceDriver.forEach(d=>console.log(d.name+' tiempo '+d.time))});

    // Crear el Global
    let raceGlobal: RaceData = new RaceData;
    raceGlobal.name = "Global";
    this.drivers.forEach(d => {
      let dr: RaceDriver = new RaceDriver;
      dr._id = d._id;
      dr.name = d.name;
      dr.team = d.team || '';
      dr.position = 999;
      raceGlobal.RaceDriver.push(dr);
    });

    //this.races.push(raceGlobal); 

    ///
    this.findDriverPositioninEachRaceByTime(); 
    //this.showRaces();

    this.assignDriverPositionInEachRace();
   
    //this.estimateGlobalDriverPosition(raceGlobal);
    this.globalRanking();
    /*
      console.log("---------------------------------------------------carreras Ordenada--");
      this.races.forEach(r=>{console.log(r.name+"---------------------------------------------------------");
      r.RaceDriver.forEach (d=>console.log(d.name+' tiempo '+d.time))});
    */ 
  }
  //
  // Create races Object from RaceData Model
  //
  createRaces() {
    this.drivers[0].races.forEach(r => {
      let race = new RaceData();
      race.name = r.name;
      this.races.push(race);
    });

    this.races.forEach(race => {
      this.drivers.forEach(element => {
        let raceD: RaceDriver = new RaceDriver;
        raceD._id = element._id;
        raceD.name = element.name;
        raceD.team = element.team || '';
        let llave: String = race.name;
        raceD.time = element.races.filter(s => s.name == race.name).map(s => s.time).toString();
        race.RaceDriver.push(raceD);
      });
    });
    // time from String to Date
    this.races.forEach(race => {
      race.RaceDriver.forEach(
        d => {
          let ntime: Date = new Date();
          ntime.setHours(
            Number(d.time.toString().split(':')[0]),
            Number(d.time.toString().split(':')[1]),
            Number(d.time.toString().split(':')[2].split('.')[0]),
            Number(d.time.toString().split(':')[2].split('.')[1]),
          );
          d.timeCompare = ntime;
        })
    });
  }
  //
  // Find positions
  // Sort in each race by time to find the final postions of each driver
  //
  findDriverPositioninEachRaceByTime() {
    this.races.forEach(race => {
      race.RaceDriver.sort((d1, d2) => {
        if (d1.timeCompare == d2.timeCompare) return 0;
        else if ((d1.timeCompare as Date) > (d2.timeCompare as Date)) return 1;
        else return -1;
      })
    });
    //
    // assign position by each Race
    //
    this.races.forEach(race => {
      for (let i = 0; i < race.RaceDriver.length; ++i) {
        race.RaceDriver[i].position = i+1;
      }
    });
  }
  //
  //  Assign to drivers position each race
  //
  assignDriverPositionInEachRace() {
    // assign in drivers the position of each race
    this.drivers.forEach(dr => {
      this.races.forEach(ra => {
        let indRace: number = this.posInDriverRace(ra.name, dr.races);
        dr.races[indRace].position = this.posInRace(ra.name, dr.name);
        
      });
    });
  }
  //  
  // this function look for the positon of the race in the array DriverRace
  // raceName is a string with race name
  // races is a DriverRace array inside DriverData 
  //
  posInDriverRace(raceName: String, races: DriverRace[]): number {
    for (let i: number = 0; i < races.length; ++i) {
      if (races[i].name == raceName)
        return i;
    }
    throw new Error('race : {$raceName} not found in driver Races');
  }

  // this function find the driver's position in a race
  // to find it, it should look in races the accurate race  and
  // look in that race the position of the driver 
  posInRace(raceName: String, driverName: string): number {
    let indRace: number = this.indRaceInRaces(raceName);
    let indDriver: number = this.indDriverInRaceDriver(driverName, indRace);
    return this.races[indRace].RaceDriver[indDriver].position || 0;
  }
  //
  // Find indes of raceName in races
  //
  indRaceInRaces(raceName: String): number {
    for (let i = 0; i < this.races.length; ++i) {
      if (this.races[i].name == raceName)
        return i;
    }
    throw new Error('race : {$raceName} not found in Races');
    return 0;
  }
  //
  // Find ind of driverName in the race indRace in races
  //
  indDriverInRaceDriver(driverName: String, indRace: number): number {
    for (let i = 0; i < this.races[indRace].RaceDriver.length; ++i) {
      if (this.races[indRace].RaceDriver[i].name == driverName)
        return i;
    }
    throw new Error('driver : {$driverName} not in race : {$this.races[indRace].name}');
    return 0;
  }
  //
  //
  showRaces () {
    console.log ("ALL RACES+++++++++++++++++++++++++++");
    this.races.forEach(race => {
      
      race.RaceDriver.forEach(
        d => {
          console.log (
            "Circuito/"+race.name+
            "/Conductor/"+d.name+ 
            "/position/"+d.position+ 
            "/time/"+ d.timeCompare 
             );
          
        })
    });
    console.log ("++++ END ALL RACES+++++++++++++++++++++++++++");
  }

  showDrivers () {
    console.log ("ALL DRIVERS+++++++++++++++++++++++++++");
    this.drivers.forEach( d => {
      
      d.races.forEach(
        race => {
          console.log (
            "Circuito/"+race.name+
            "/Conductor/"+d.name+ 
            "/position/"+race.position + 
            "/granking/"+ d.gRanking +
            "/gtime/"+ d.gTime
             );
          
        })
    });
    console.log ("++++ END ALL DRIVERS+++++++++++++++++++++++++++");
  }
  //

  globalRanking (){

    this.drivers.forEach (d=>{
      d.gRanking =0;
      d.gTime = 0;
      d.races.forEach (r=>{
        d.gRanking += r.position;
        d.gTime +=  this.miliSeconds( r.time);
      });
    });

    this.drivers.sort((a,b)=>{
        if (a.gRanking==b.gRanking)
            return a.gTime-b.gTime;
        else
             return a.gRanking-b.gRanking});
    for (let j: number = 0; j < this.drivers.length; ++j) {
      this.drivers[j].gRanking = j+1;
    }
  }

  miliSeconds ( sTime : String) : number {
    let ntime : number=0;
    ntime = Number ( sTime.split(':')[0])*36000+
            Number(sTime.split(':')[1])*6000+
            Number (sTime.split(':')[2].split('.')[0])*100+
            Number (sTime.split(':')[2].split('.')[1]);

    return ntime;
  }


  estimateGlobalDriverPosition(raceGlobal: RaceData) {
    // Sort by Drivers by Name in order to manipulate same rows
    this.races.forEach(r => {
      r.RaceDriver.sort((a, b) => {
        if (a.name == b.name) return 0;
        else if (a.name > b.name) return 1;
        else return -1
      });
    });

    
    raceGlobal.RaceDriver.sort((a, b) => {
      if (a.name == b.name) return 0;
      else if (a.name > b.name) return 1;
      else return -1
    });

    console.log(" acccumulator")
    let acDriver: Array<number> = new Array<number>();
    // se suman las posicio
    for (let j: number = 0; j < this.drivers.length; ++j) {
      for (let i: number = 0; i < this.races.length; ++i) {
        acDriver[j] = (this.races[i].RaceDriver[j].position || 0);
      }
      console.log("para j:" + j + " driver:" + raceGlobal.RaceDriver[j].name + " puntos:" + acDriver[j]);
      raceGlobal.RaceDriver[j].position = acDriver[j];
    }
    console.log("sort");
    raceGlobal.RaceDriver.sort((a, b) => (b.position || 0) - (a.position || 0));
    raceGlobal.RaceDriver.forEach(d => console.log(d.name + " " + (d.position || 0)));
    //this.races.push (raceGlobal);  error de compilacion

    // Races are again sorted by time 



  }








  ngOnInit(): void {
    this.drivers = this.infoPage.getInfoChampionShip();
    this.buildRaceData();
    this.driversList = this.drivers;
    this.driversList.forEach(d=>console.log(d));
  }

}


