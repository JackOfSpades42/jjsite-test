import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-picross',
  templateUrl: './picross.component.html',
  styleUrls: ['./picross.component.css']
})

export class PicrossComponent implements OnInit {

  board = new board;

  constructor() { }

  ngOnInit(): void {
    for (let a=0;a<5;a++){
      this.board.rows[a] = new row;
      for (let b=0;b<5;b++){
        this.board.rows[a].squares[b] = 2;
      }
    }
  }

}
class row {
  squares: any[];
  constructor(){
    this.squares = [];
  }
}
class board {
    rows: row[];
    constructor(){
      this.rows = [];
    }
}