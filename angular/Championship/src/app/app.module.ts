import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'


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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
