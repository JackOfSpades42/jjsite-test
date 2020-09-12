import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-picross',
  templateUrl: './picross.component.html',
  styleUrls: ['./picross.component.css']
})

export class PicrossComponent implements OnInit {

  board: board;

  constructor() { }

  ngOnInit(): void {
    this.board = new board(10);
  }

  solve(){
    while (!this.board.solved){
      
    }
  }

}

class row {
  squares: any[];
  clues: number[];
  filled: boolean;
  reducedRows: reducedRow[];

  constructor(a:number){
    this.squares = [];
    for (let b=0;b<a;b++){
      this.squares[b] = 2;
    }
    this.clues = [];
    this.filled = false;
  }

  fill_start(){
    for (let a=0;a<this.clues[0];a++){
      this.squares[a] = 1;
    }
    this.squares[this.clues[0]] = 0;
  }

  fill_end(){
    for(let a=this.squares.length-1;a>this.squares.length - this.clues[0];a--){
      this.squares[a] =1;
    }
    this.squares[this.squares.length - this.clues[0] - 1] = 0;
  }

  reduce(){
    if (this.clues.length>1){
      for (let a=0;a<this.clues.length;a++){
        let index1 = 0;
        if (a>0){
          index1 += a;
          let b =0;
          while(b < a){
            index1 += this.clues[b];
            b++;
          }
        }
        let index2 = this.squares.length - 1;
        if (a< this.clues.length-1){
          index2 -= (this.squares.length - 1) - (this.clues.length - 1 - a);
          let c =0;
          while (c>a){
            index2 -= this.clues[c];
            c--;
          }
        }
        this.reducedRows[a] = new reducedRow(this.clues[a],index1,index2,this);
      }
    }
  }
}

class reducedRow extends row {
  index1: number;
  index2: number;
  targetClue: number;
  parent: row;
  constructor(clue,index1,index2,row){
    super(row.squares.length);
    this.targetClue = clue;
    this.index1 = index1;
    this.index2 = index2;
    this.parent = row;
  }
}


class board {
    solved: boolean;
    rows: row[];
    constructor(a:number){
      this.rows = [];
      this.solved = false;
      for (let b=0;b<a;b++){
        this.rows[b] = new row(a);
      }
    }
}