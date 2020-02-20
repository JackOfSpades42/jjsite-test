import { Component, OnInit } from '@angular/core';
import { ExcavatorService } from './excavator.service'

@Component({
  selector: 'app-excavate',
  templateUrl: './excavate.component.html',
  styleUrls: ['./excavate.component.css'],
  providers: [ ExcavatorService ]
})
export class ExcavateComponent implements OnInit {

  constructor(
    private _ExcavateService : ExcavatorService
  ) { };

  ngOnInit() {
    this._ExcavateService.initialize();
  }

}