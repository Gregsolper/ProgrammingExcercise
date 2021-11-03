import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriverResultRoutingModule } from './driver-result-routing.module';
import { DriverPageComponent } from './pages/driver-page/driver-page.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    DriverPageComponent
  ],
  imports: [
    CommonModule,
    DriverResultRoutingModule,
    SharedModule
    
  ]
})
export class DriverResultModule { }
