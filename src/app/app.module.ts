import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app.routing.module';

import { AppComponent } from './app.component';
import { NumComponent } from './num/num.component';
import { BlogComponent } from './blog/blog.component';
import { PostComponent } from './post/post.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, AppRoutingModule ],
  declarations: [ AppComponent, NumComponent, BlogComponent, PostComponent, BlogComponent, PostComponent ],
  bootstrap:    [ AppComponent ],
})
export class AppModule { }
