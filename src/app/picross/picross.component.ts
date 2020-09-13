import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-picross',
  templateUrl: './picross.component.html',
  styleUrls: ['./picross.component.css']
})

export class PicrossComponent implements OnInit {
  picross = new FormGroup({
    col0: new FormControl(''),
    col1: new FormControl(''),
    col2: new FormControl(''),
    col3: new FormControl(''),
    col4: new FormControl(''),
    row0: new FormControl(''),
    row1: new FormControl(''),
    row2: new FormControl(''),
    row3: new FormControl(''),
    row4: new FormControl(''),
  });
  board: board;

  constructor() { }

  ngOnInit(): void {
    this.board = new board(5);
  }

  solve(){
    while (!this.board.solved){
      
    }
  }
  onSubmit(){
    console.log(this.picross.value);
    if (this.picross.value.col0 > 10){
      let col0cntrl = this.picross.controls["col0"];
      col0cntrl.setValue("10");
    }
    console.log(this.picross.controls["col" + 0].value);
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