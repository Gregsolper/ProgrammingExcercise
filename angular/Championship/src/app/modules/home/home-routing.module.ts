import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriverResultRoutingModule } from '../driver-result/driver-result-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
  {
    path:"driver",
    loadChildren:()=>import('@modules/driver-result/driver-result.module').then(m=>m.DriverResultModule)
    
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
