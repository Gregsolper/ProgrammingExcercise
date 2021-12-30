import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './components/headerId/header.component';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer/footer.component';
import { TableComponent } from './components/table/table.component';
import { DriverComponent } from './components/driver/driver/driver.component';
import { InfoService } from './services/info.service';
import { CommunicationService } from './services/communication.service';
import { ViewCoordinationService } from './services/view-coordination.service';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //{path: '', redirectTo: '/race', pathMatch: 'full'},
  //{path: 'driver', component: DriverComponent},
  {path: 'race', component: TableComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TableComponent,
    DriverComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  
  providers: [ InfoService, CommunicationService, ViewCoordinationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
