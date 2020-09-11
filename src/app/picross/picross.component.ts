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
        this.board.rows[a].squares[b] = 1;
        if (b==0){
          this.board.rows[a].squares[b] = 0;
        } else if (b==1){
          this.board.rows[a].squares[b] = 0;
        } else {}
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