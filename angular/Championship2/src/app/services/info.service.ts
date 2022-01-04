//import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as data from 'src/app/data/driver.json';
//  to use it is necesary to  change in tsconfig.json
//  "compilerOptions": {
//  "resolveJsonModule": true,
//  in order to read file with Json format
import { DriverData } from '../models/DriverData';
import { DriverRace } from '../models/DriverRace';
import { RaceData } from 'src/app/models/RaceData'; // add
import { RaceDriver } from 'src/app/models/RaceDriver'; //add
import { Option } from 'src/app/models/Option'; //add
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * Service needed to provide Driver and Race information
 * file 'src/app/data/driver.json' is readed and procesed to buil
 * drivers and races arrays.  
 * almost the same information but with a different structure
 * 
 * Based on the times, the position of each driver in each of the races is calculated.
 * 
 * To calculate the global position of the driver, 
 * the positions obtained in each race are compared and 
 * in the event of a tie it is seen who has covered the total of
 *  the championship in the shortest time.
 * 
 * Some changes necessary to work with a server are indicated in the comments.
 * 
 * @see models.DriverData
 * @see models.DriverRace
 * @see models.
 * 
 */
export class InfoService {
  drivers: Array<DriverData> = []; 
  races: Array<RaceData> = []; 
  raceOptions: Array<Option> = [];
  info : any = {};
  loaded = false;
  currentDriver : DriverData = new DriverData;

  dataFile : any = (data as any).default;
  driverSet : Array<DriverData> = [];

  //constructor( private http: HttpClient) {  Use when an API is provided
    /**
     * Build component.  Read Data and call function to processinformation
     */ 
    constructor( ) {
      console.log ("Data service is running..");
      // Read data file
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
      // call function to prepare information
      this.buildRaceData();
      // set current driver
      this.currentDriver = this.drivers[0];
    }
    /**
     * Provides the race arrangement
     * @returns "races"
     */
    getInfoRacesChampionShip () : Observable<RaceData[]> {
      return of (this.races);
    }
    /**
    *  Indicates what is the name of the current driver
     * @param searchedDriver Driver's name 
     * uses "drivers"
     */
    setCurrentDriver (searchedDriver : String)  {
      if (searchedDriver=="") {
        this.currentDriver = this.drivers[0];
      }
      else 
        this.currentDriver = this.drivers.filter (x=> x.name == searchedDriver )[0];
    }
    /**
     * Reports current driver name
     * @returns current driver's name
     */
    getCurrentDriver () : Observable <DriverData> {
    return of( this.currentDriver );
    }
    
    /**
     * Provide the information of the requested driver
     * @param searchedDriver driver0s name 
     * @returns driver's data
     */
    getInfoDriver (searchedDriver : String) : Observable <DriverData> {
      if (searchedDriver=="") {
        return  of (this.drivers[0] );
      }
      return of( this.drivers.filter (x=> x.name == searchedDriver )[0] );
    }
    /**
     * Provides the information of the requested driver
     * @param searchedRace race's name
     * @returns race's data
     */
    getInfoRace (searchedRace : String)  : Observable <RaceData> {
      return of(this.races.filter (x=> x.name == searchedRace )[0]);
    }
   /********************************************************************** */

   /**
    * build a list of championship races to be displayed
    * 
    * uses "races"
    */
   buildRaceOptions () {
    this.races.forEach(element => {
      let nueva = new Option();
      nueva.id = element.name;
      nueva.name = element.name;
      this.raceOptions.push(nueva);
    });
   }
   /**
    * function that processes the information to find the position 
    * of each driver in the championship. The calculation is based on
    *  the driver's position in each race and on his overall time.
    * 
    * It will not be necessary if the information is obtained from the WEB server
    */
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
    this.createGlobalRace ();
    this.buildRaceOptions();
    this.ordenaDriversPresenta ()
  }
  /**
   * Create an arrangement of the races to get a better view of the information
   * 
   * uses "drivers"
   * create "races"
   */
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
  /**
   * find the position of each driver based on the time spent
   * update "races"
   */
  findDriverPositioninEachRaceByTime() {
  // order the drivers for each race by the time taken
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
  /**
   * Assign to drivers position each race.
   * 
   * assigns in the driver arrangement the positions that
   * were previously calculated in the racing arrangement.
   * 
   * Uses "races"
   * Update "drivers"
   */
  assignDriverPositionInEachRace() {
    // assign in drivers the position of each race
    this.drivers.forEach(dr => {
      this.races.forEach(ra => {
        let indRace: number = this.posInDriverRace(ra.name, dr.races);
        dr.races[indRace].position = this.posInRace(ra.name, dr.name);
        
      });
    });
  }
  /**
   * this function searches the position of a given race's name in the DriverRace array
   * @param raceName race's name to look for
   * @param races races in which the driver participated
   * @returns position0s race in the array
   */
   posInDriverRace(raceName: String, races: DriverRace[]): number {
    for (let i: number = 0; i < races.length; ++i) {
      if (races[i].name == raceName)
        return i;
    }
    throw new Error('race : {$raceName} not found in driver Races');
  }
  /**
   * This function finds the driver's position in a race to find it,
   * it is need to search in "races" for the precise race and 
   * search in that race for the driver's position
   * use auxiliary functions
   * @param raceName name of the race in which the driver will be searched
   * @param driverName name of the driver to be searched
   * @returns  driver's position in a race 
   */
  posInRace(raceName: String, driverName: string): number {
    let indRace: number = this.indRaceInRaces(raceName);
    let indDriver: number = this.indDriverInRaceDriver(driverName, indRace);
    return this.races[indRace].RaceDriver[indDriver].position || 0;
  }
  /**
   * Look for the race position in the arrangement
   * @param raceName career sought
   * @returns position
   */
  indRaceInRaces(raceName: String): number {
    for (let i = 0; i < this.races.length; ++i) {
      if (this.races[i].name == raceName)
        return i;
    }
    throw new Error('race : {$raceName} not found in Races');
    return 0;
  }
  /**
   * function to find the position of the driver in the indicated race
   * @param driverName name of the driver whose position is being sought
   * @param indRace indicates the race in which the driver's position is sought
   * @returns the driver's position in the indicated race
   */
  indDriverInRaceDriver(driverName: String, indRace: number): number {
    for (let i = 0; i < this.races[indRace].RaceDriver.length; ++i) {
      if (this.races[indRace].RaceDriver[i].name == driverName)
        return i;
    }
    throw new Error('driver : {$driverName} not in race : {$this.races[indRace].name}');
    return 0;
  }
  /**
   * Create a new race called Global in order to save global information
   * Uses "drivers"
   * Update "races"
   */
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
  /**
   * function that allows to calculate the global position of each conductor
   * Read and update "drivers"
   */
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
  /**
   * Sort races array into drivers array by race's name
   * uses "drivers"
   */
  ordenaDriversPresenta (){
    this.drivers.forEach (d=>{
      d.races.sort ((a,b)=>{if (a.name>b.name) return 1; else return -1;});
    });
  }
  /**
   * function to convert a string (with time information) to its equivalent in milliseconds.
   * @param sTime string with a time expresion
   * @returns the equivalent miliseconds
   */
  miliSeconds ( sTime : String) : number {
    let ntime : number=0;
    ntime = Number ( sTime.split(':')[0])*36000+
            Number(sTime.split(':')[1])*6000+
            Number (sTime.split(':')[2].split('.')[0])*100+
            Number (sTime.split(':')[2].split('.')[1]);

    return ntime;
  }
  /** 
   * used to debug
   */
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
  /**
   * used to debug
   */
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
}
