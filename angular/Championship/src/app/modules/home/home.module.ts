import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SharedModule } from '@shared/shared.module';
import { RaceDriverTableComponent } from './pages/race-driver-table/race-driver-table.component';
import { DriverRaceTableComponent } from './pages/driver-race-table/driver-race-table.component';
import { DriverCardComponent } from './pages/driver-card/driver-card.component';

@NgModule({
  declarations: [
    HomePageComponent,
    RaceDriverTableComponent,
    DriverRaceTableComponent,
    DriverCardComponent
    
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
