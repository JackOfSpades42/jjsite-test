import { Component, OnInit } from '@angular/core';

import { Xavier } from './chess.service';

@Component({
  selector: 'app-chess',
  templateUrl: './chess.component.html',
  styleUrls: ['./chess.component.css'],
  providers: [ Xavier ]
})
export class ChessComponent implements OnInit {

  constructor(
    private Xavier : Xavier
  ) { };

  ngOnInit() {
  }

}