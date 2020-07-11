import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';

  constructor (private renderer: Renderer2){
    renderer.setStyle(document.body, "background", "rgb(170, 240, 240)");
  }
}
