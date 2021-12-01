import { DriverRace } from "./DriverRace";

export class DriverData {
    _id : any;
    picture? : string ="";
    age? : number= 20;
    name : string ="";
    team? : string ="";
    gRanking? : number;
    races : Array<DriverRace> = [];
}