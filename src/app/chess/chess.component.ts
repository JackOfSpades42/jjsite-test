import { Component, OnInit } from '@angular/core';
import { ɵBrowserDomAdapter } from '@angular/platform-browser';

@Component({
  selector: 'app-chess',
  templateUrl: './chess.component.html',
  styleUrls: ['./chess.component.css'],
})
export class ChessComponent implements OnInit {
  board: board;
  constructor(
  ) {};

  ngOnInit() {
    let startingPos = 'bRbNbBbKbQbBbNbR';
    for (let a=0;a<8;a++){
      startingPos += 'bP';
    }
    for (let b=0;b<4;b++){
      startingPos += 'eeeeeeeeeeeeeeee';
    }
    for (let c=0;c<8;c++){
      startingPos += 'wP';
    }
    startingPos += 'wRwNwBwKwQwBwNwRw';
    this.createBoard(startingPos);
  }
  createBoard(str:string){
    for (let a=0;a<8;a++){
      for (let b=0;b<8;b++){
        this.board.rows[a].pieces[b] = new piece(str[a*16 + b*2] + str[a*16 + b*2 +1]);
      }
    }
  }
}
class board {
  rows :row[] = [];
  boardString: string;
}
class piece{
  type: string;
  color: string;
  img: HTMLImageElement;
  constructor(a:string){
    this.color = a[0];
    this.type = a[1];
    this.img = new Image();
    this.img.src = 'assests/img/' + this.color + this.type + '.png';
  }
}
class row{
  pieces: piece[] = [];
}