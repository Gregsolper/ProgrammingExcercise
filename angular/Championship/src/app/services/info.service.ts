import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as data from '../data/driver.json';
import { DriverData } from '../models/DriverData';
import { DriverRace } from '../models/DriverRace';
import { RaceData } from 'src/app/models/RaceData'; // add
import { RaceDriver } from 'src/app/models/RaceDriver'; //add
import { Option } from 'src/app/models/Option'; //add
import { Observable, of } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  drivers: Array<DriverData> = []; //add
  races: Array<RaceData> = []; //add
  allRaces: Array<String> = []; //add
  raceOptions: Array<Option> = [];
  info : any = {};
  loaded = false;

  dataFile : any = (data as any).default;
  driverSet : Array<DriverData> = [];

  constructor( private http: HttpClient) {
    console.log ("Service is running..");
    /* if the information is in a page 
   
    http.get ('/assets/driver.json')
          .subscribe ( resp=>{
            this.info = resp;
            this.loaded = true  ;
          });
    */
          //console.log ('data-->' + data);
          
    this.dataFile.forEach((element: { _id: any; age: number; picture: string; team: string; name: string; races: DriverRace[]; }) => {
      let otro : DriverData = new DriverData;
      otro._id = element._id;
      otro.age = element.age;
      otro.picture = element.picture;
      otro.team = element.team;
      otro.name = element.name;
      otro.races = element.races;
      this.driverSet.push ( otro);
    });    
    this.drivers=this.driverSet;
    this.buildRaceData();

    }

   getInfoChampionShip ()  {
    return this.drivers;
   }

   getInfoRacesChampionShip ()  {
    return this.races;
   }

   getInfoDriver (searchedDriver : String) : Observable <DriverData> {
     if (searchedDriver=="") {
       return  of (this.drivers[0] );
     }
    return of( this.drivers.filter (x=> x.name == searchedDriver )[0] );
   }

   getInfoRace (searchedRace : String)  : Observable <RaceData> {
    return of(this.races.filter (x=> x.name == searchedRace )[0]);
   }

   buildRaceOptions () {
    this.races.forEach(element => {
      let nueva = new Option();
      nueva.id = element.name;
      nueva.name = element.name;
      this.raceOptions.push(nueva);
    });
   }
   getInfoRaceCategories () {
         return this.raceOptions;
   }

  

   buildRaceData() {
    count_driver: Number;
    count_race: Number;
    first: Boolean;
    let first = true;
    let count_driver = 0;

    this.createRaces();
    this.findDriverPositioninEachRaceByTime(); 
    this.assignDriverPositionInEachRace();
    this.globalRanking();
    this.createGlobalRace ()
    this.buildRaceOptions();
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
        raceD.picture = element.picture;
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

  createGlobalRace () {
    let raceDriverG = new RaceData;
    raceDriverG.name = "Global";
    this.drivers.forEach( driver => {
      let nuevo = new RaceDriver;
      nuevo._id = driver._id;
      nuevo.name = driver.name;
      nuevo.picture = driver.picture;
      nuevo.position = driver.gRanking;
      nuevo.team = driver.team;
      raceDriverG.RaceDriver.push (nuevo);
    });
    this.races.push(raceDriverG);
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
}
