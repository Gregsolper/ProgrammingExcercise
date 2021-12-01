import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as data from '../data/driver.json';
import { DriverData } from '../models/DriverData';
import { DriverRace } from '../models/DriverRace';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
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


    }

   getInfoChampionShip ()  {
    return this.driverSet;
   }

  
}
