import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { InfoService } from './services/info.service';


@NgModule({
  declarations: [  // declaraciones, componentes, directivas, pipes . . .
    AppComponent
  ],
  imports: [  // Solo se importan otros modulos
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  exports:[  //  Se pueden hacer exportaciones

  ],
  providers: [InfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
