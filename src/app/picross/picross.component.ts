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
    this.testClues();
  }

  testClues(){
    this.picross.controls["col0"].setValue("2");
    this.picross.controls["col1"].setValue("2");
    this.picross.controls["col2"].setValue("3 1");
    this.picross.controls["col3"].setValue("2 2");
    this.picross.controls["col4"].setValue("3");
    this.picross.controls["row0"].setValue("2");
    this.picross.controls["row1"].setValue("2");
    this.picross.controls["row2"].setValue("1 1 1");
    this.picross.controls["row3"].setValue("5");
    this.picross.controls["row4"].setValue("3");
  }

  solve(){
    this.board = new board(5);
    this.getClues(this.board);
    this.initialize(this.board);
    for (let brdCount=0;brdCount<this.squareSize*2;brdCount++){
      if (brdCount<this.squareSize){
        this.board.rows[brdCount].iterate();
      } else {
        this.board.updateColsFromRows(brdCount-this.squareSize);
        this.board.columns[brdCount-this.squareSize].iterate();
        for (let update=0;update<this.squareSize;update++){
          this.board.updateRowsFromCols(update);
        }
      }
    }
    /*while (!this.board.solved){
      //
    }*/
    //console.log(this.board.columns[1].reducedRows);
    let testRow = new row(5);
    testRow.clues = [2];
    testRow.squares = [2,2,0,1,2];
    //testRow.reduce();
    //testRow.reducedRows[0].fill_overlap();
    //testRow.reducedRows[1].fill_overlap();
    //testRow.updateRowFromReduced();
    //testRow.fill_overlap();
    //testRow.fill_end();
    //testRow.fill_start();
    testRow.iterate();
    console.log("testrow= " + testRow.squares);
  }
  onSubmit(){
    //console.log(this.picross.value);
    if (this.picross.value.col0 > 10){
      let col0cntrl = this.picross.controls["col0"];
      col0cntrl.setValue("10");
    }
    //console.log(parseInt(this.picross.controls["col" + 0].value) + 1);
    this.solve();
  }
  getClues(brd:board){
    for(let a=0;a<this.squareSize;a++){
      let rowClueString = this.picross.controls["row" + a].value;
      let colClueString = this.picross.controls["col" + a].value;
      //console.log("cluestring= " + rowClueString.length);
      if (rowClueString.length > 1){
        for (let b=0;b<rowClueString.length;b++){
          if (rowClueString[b]!=" "){
            brd.rows[a].clues.push(parseInt(rowClueString[b]));
          }
        }
      } else {
        brd.rows[a].clues.push(parseInt(rowClueString));
      }

      if (colClueString.length > 1){
        for (let b=0;b<colClueString.length;b++){
          if (colClueString[b]!=" "){
            brd.columns[a].clues.push(parseInt(colClueString[b]));
          }
        }
      } else {
        brd.columns[a].clues.push(parseInt(colClueString));
      }
      brd.columns[a].clues.reverse();
    }
  }

  initialize(brd:board){
    for (let count=0;count<this.squareSize;count++){
      let row = brd.rows[count];
      if (row.clues.length>1){
        row.reduce();
        for (let redCount=0;redCount<row.reducedRows.length;redCount++){
          let currRedRow = row.reducedRows[redCount];
          currRedRow.fill_overlap();
          if (!currRedRow.isFull()){
            if (currRedRow.squares[0]==1){
              currRedRow.fill_start();
            }
            if (currRedRow.squares[currRedRow.squares.length -1]==1){
              currRedRow.fill_end();
            }
          }
        }
        row.updateRowFromReduced();
      } else {
        row.fill_overlap();
        if (!row.isFull()){
          if (row.squares[0]==1){
            row.fill_start();
          }
          if (row.squares[row.squares.length -1]==1){
            row.fill_end();
          }
        }
      }
    }
    for (let colCount=0;colCount<this.squareSize;colCount++){
      brd.updateColsFromRows(colCount);
      let col = brd.columns[colCount];
      if (col.clues.length>1){
        col.reduce();
        if (colCount==1){
          console.log(brd.columns[1].squares);
          console.log(brd.columns[1].reducedRows);
        }
        for (let colRed=0;colRed<col.reducedRows.length;colRed++){
          let currRed = col.reducedRows[colRed];
          currRed.fill_overlap();
          if (!currRed.isFull()){
            if (currRed.squares[0]==1){
              currRed.fill_start();
            }
            if (currRed.squares[currRed.squares.length - 1]==1){
              currRed.fill_end();
            }
          }
        }
        col.updateRowFromReduced();
      } else {
        col.fill_overlap();
        if (!col.isFull()){
          if (col.squares[0]==1){
            col.fill_start();
          }
          if (col.squares[col.squares.length-1]==1){
            col.fill_end();
          }
        }
      }
      //console.log(brd.columns[colCount]);
      //console.log(brd.columns[colCount].clues);
      for (let update=0;update<this.squareSize;update++){
        brd.updateRowsFromCols(update);
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
        if (a>=edgeEmpties && a<this.squares.length - edgeEmpties){
          this.squares[a]=1;
        }
      }
    }
  }

  reduce(){
    if (this.clues.length>1){
      this.reducedRows = [];
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
          index2 -= (this.clues.length - 1 - a);
          let c =this.clues.length - 1;
          while (c>a){
            index2 -= this.clues[c];
            c--;
          }
        }
        this.reducedRows[a] = new reducedRow(this.clues[a],index1,index2,this);
      }
    }
  }

  isFull(){
    if (this.squares.indexOf(2)==-1){
      return true;
    }
    return false;
  }

  updateRowFromReduced(){
    for (let a=0;a<this.reducedRows.length;a++){
      let currRed = this.reducedRows[a];
      for (let b=0;b<currRed.squares.length;b++){
        if (currRed.squares[b]!==2){
          this.squares[b + currRed.index1] = currRed.squares[b];
        }
      }
    }
  }

  iterate(){
    let cluesFilled = 0;
      if (!this.isFull()){
        for (let b=0;b<this.squares.length;b++){
          if (this.squares[b]==1){
            if (b==this.squares.indexOf(1)){
              if (b==this.clues[0]){
                this.squares[0] = 0;
              } else if (b<this.clues[0]-1){
                this.squares[b+1] = 1;
              }
            }
            if (this.squares[b-1]==0){
              for (let c=b+1;c<this.clues[0] + b;c++){
                this.squares[c] = 1;
              }
            }
            if(b!==0 && b!==this.squares.length -1){
              if (this.squares[b-1]==1){
                let lineCount = 0;
                let curr = b;
                while (curr!==-1){
                  if (this.squares[curr]==1){
                    lineCount++;
                  }
                  curr--;
                }
                if (lineCount==this.clues[0]){
                  cluesFilled++;
                  while (this.squares.indexOf(2)!==-1){
                    this.squares[this.squares.indexOf(2)] = 0;
                  }
                }
              }
            }
          }
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
    super(index2-index1+1);
    this.targetClue = clue;
    this.index1 = index1;
    this.index2 = index2;
    this.parent = row;
    for (let a=0;a<this.squares.length;a++){
      this.squares[a] = this.parent.squares[index1 + a];
    }
    this.reReduce();
  }

  fill_overlap(){
    if (this.squares.length/this.targetClue < 2){
      let edgeEmpties = this.squares.length - this.targetClue;
      for (let a=0;a<this.squares.length;a++){
        if (a>=edgeEmpties && a<this.squares.length - edgeEmpties){
          this.squares[a]=1;
        }
      }
    }
    if (this.squares.length==this.targetClue){
      if (this.index1!==0){
        this.parent.squares[this.index1-1] = 0;
      }
      if (this.index2!==this.parent.squares.length-1){
        this.parent.squares[this.index2+1] = 0;
      }
    }
  }

  reReduce(){
    while(this.squares[0]==0){
      this.squares.shift();
      this.index1++;
    }
    while(this.squares[this.squares.length-1]==0){
      this.squares.pop();
      this.index2--;
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

    updateColsFromRows(num:number){
      for (let a=0;a<this.rows.length;a++){
        if (this.rows[a].squares[num]!==2){
          this.columns[num].squares[a] = this.rows[a].squares[num];
        }
      }
    }

    updateRowsFromCols(num:number){
      for (let a=0;a<this.rows.length;a++){
        if (this.columns[a].squares[num]!==2){
          this.rows[num].squares[a] = this.columns[a].squares[num];
        }
      }
    }
}