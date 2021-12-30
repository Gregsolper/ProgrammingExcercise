import { DriverRace } from "./DriverRace";

export class DriverData {
    _id : any;
    picture : string ="";
    age : number= 0;
    name : string ="";
    team : string ="";
    gRanking : number=99;
    gTime : number=0;
    races : Array<DriverRace> = [];
}