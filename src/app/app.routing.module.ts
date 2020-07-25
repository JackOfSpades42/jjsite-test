import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ContactComponent } from './contact/contact.component';
import { ResumeComponent } from './resume/resume.component';

import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';

import { ExcavateComponent } from './excavate/excavate.component';
import { ChessComponent } from './chess/chess.component';
import { NumComponent } from './num/num.component';
import { BlogComponent } from './blog/blog.component';


@NgModule({
  declarations: [ 
    ProjectComponent, HomeComponent, ContactComponent, ResumeComponent,
    ExcavateComponent, ChessComponent,
  ],
  imports: [
    RouterModule.forRoot([
      { path: 'Contact', component: ContactComponent },
      { path: 'Resume', component: ResumeComponent },
      { path: 'Project', component: ProjectComponent },
      { path: 'Home', component: HomeComponent },
      { path: 'excavate', component: ExcavateComponent},
      { path: 'chess', component: ChessComponent},
      { path: 'num', component:NumComponent},
      { path: 'blog', component: BlogComponent},
      { path: '**', redirectTo: 'Home' }
    ])
  ],
  exports: [
    RouterModule,
  ],
  providers: [],

})
export class AppRoutingModule {}
