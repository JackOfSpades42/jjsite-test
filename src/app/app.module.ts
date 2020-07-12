import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app.routing.module';

import { AppComponent } from './app.component';
import { NumComponent } from './num/num.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, AppRoutingModule ],
  declarations: [ AppComponent, NumComponent ],
  bootstrap:    [ AppComponent ],
})
export class AppModule { }
