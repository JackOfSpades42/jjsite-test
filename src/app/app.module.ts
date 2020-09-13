import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app.routing.module';

import { AppComponent } from './app.component';
import { NumComponent } from './num/num.component';
import { BlogComponent } from './blog/blog.component';
import { PostComponent } from './post/post.component';
import { PicrossComponent } from './picross/picross.component'; 

@NgModule({
  imports:      [ BrowserModule, FormsModule, AppRoutingModule, ReactiveFormsModule ],
  declarations: [ AppComponent, NumComponent, BlogComponent, PostComponent, PicrossComponent ],
  bootstrap:    [ AppComponent ],
})
export class AppModule { }
