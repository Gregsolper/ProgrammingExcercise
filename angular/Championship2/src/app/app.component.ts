import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { TableComponent } from './components/table/table.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
}) 


export class AppComponent  {
  raceView : Boolean = true;
  title = 'Championship 2021';
}
