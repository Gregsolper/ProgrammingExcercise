import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriverPageComponent } from './pages/driver-page/driver-page.component';

const routes: Routes = [
  {
    path : '',
    component : DriverPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverResultRoutingModule { }
