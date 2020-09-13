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
  squareSize: number;

  constructor() { }

  ngOnInit(): void {
    this.board = new board(5);
    this.squareSize = 5;
  }

  solve(){
    this.getClues(this.board);
    while (!this.board.solved){
      //
    }
  }
  onSubmit(){
    console.log(this.picross.value);
    if (this.picross.value.col0 > 10){
      let col0cntrl = this.picross.controls["col0"];
      col0cntrl.setValue("10");
    }
    console.log(parseInt(this.picross.controls["col" + 0].value) + 1);
  }
  getClues(brd:board){
    for(let a=0;a<this.squareSize;a++){
      let rowClueString = this.picross.controls["row" + a].value;
      let colClueString = this.picross.controls["col" + a].value;
      if (rowClueString.length > 1){
        for (let b=0;b<length;b++){
          if (rowClueString[b]!=" "){
            brd.rows[a].clues.push(parseInt(rowClueString[b]));
          }
        }
      } else {
        brd.rows[a].clues.push(parseInt(rowClueString));
      }

      if (colClueString.length > 1){
        for (let b=0;b<length;b++){
          if (colClueString[b]!=" "){
            brd.columns[a].clues.push(parseInt(colClueString[b]));
          }
        }
      } else {
        brd.columns[a].clues.push(parseInt(colClueString));
      }
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

  fill_overlap(){
    if (this.squares.length/this.clues[0] < 2){
      let edgeEmpties = this.squares.length - this.clues[0];
      for (let a=0;a<this.squares.length;a++){
        if (a>=edgeEmpties || a<this.squares.length - edgeEmpties){ //double check this manually
          this.squares[a]=1;
        }
      }
    }
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
  reducedLength: number;
  constructor(clue,index1,index2,row){
    super(row.squares.length);
    this.targetClue = clue;
    this.index1 = index1;
    this.index2 = index2;
    this.parent = row;
    this.reducedLength = index2 - index1;
  }

  fill_overlap(){
    if (this.reducedLength/this.targetClue < 2){
      let edgeEmpties = this.reducedLength - this.targetClue;
      for (let a=this.index1;a<this.index2;a++){
        if (a>=edgeEmpties || a<this.reducedLength - edgeEmpties){ //double check this manually
          this.squares[a]=1;
        }
      }
    }
  }
}


class board {
    solved: boolean;
    rows: row[];
    columns: row[];
    constructor(a:number){
      this.rows = [];
      this.columns = [];
      this.solved = false;
      for (let b=0;b<a;b++){
        this.rows[b] = new row(a);
        this.columns[b] = new row(a);
      }
    }
}