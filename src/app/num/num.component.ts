import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-num',
  templateUrl: './num.component.html',
  styleUrls: ['./num.component.css']
})
export class NumComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let textbox = document.getElementById("textbox");
    //textbox.innerHTML += "I am thinking of a 5 digit number between 00000 and 99999<br>You input a number<br>and I will tell you how many are in the proper position and if your guess is an optimal guess.";
    textbox.innerHTML += "Please write down 5 seperate digits between 0 and 9.<br>I will show a list of numbers<br>and you tell me how many numbers I got in the right position.<br>If necessary you may use the spaces on the right to input your digits, but these spaces will not be used to choose my guesses (pinky promise)";
  }

}