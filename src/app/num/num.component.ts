import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-num',
  templateUrl: './num.component.html',
  styleUrls: ['./num.component.css']
})
export class NumComponent implements OnInit {
  guessArray = [];
  firstHit = true;
  constructor(
  ) { }

  ngOnInit() {
    for (let a=0;a<10;a++){
        for (let b=0;b<10;b++){
            for (let c=0;c<10;c++){
                for (let d=0;d<10;d++){
                    for (let e=0;e<10;e++){
                        let arrayInt = a*10000 + b*1000 + c*100 + d*10 + e;
                        let array = [];
                        array[0] = a;
                        array[1] = b;
                        array[2] = c;
                        array[3] = d;
                        array[4] = e;
                        this.guessArray[arrayInt] = array;
                    }
                }
            }
        }
    }
    let textbox = document.getElementById("textbox");
    //textbox.innerHTML += "I am thinking of a 5 digit number between 00000 and 99999<br>You input a number<br>and I will tell you how many are in the proper position and if your guess is an optimal guess.";
    textbox.innerHTML += "Please write down 5 seperate digits between 0 and 9.<br>I will show a list of numbers<br>and you tell me how many numbers I got in the right position.<br>If necessary you may use the spaces on the right to input your digits, but these spaces will not be used to choose my guesses (pinky promise)<br>";
    console.log(this.guessArray);
    
  }
  go(){
    if (parseInt(userInput.value)<5 && userInput.value !==""){
            left -= this.reduceChoices(parseInt(userInput.value),n,ran);
            if (left<=0){
                textbox.innerHTML += "Are you sure? Maybe try it again.";
                bottomText.innerHTML = "";
                userInput.value = "";
                userInput.setAttribute("hidden","");
                this.firstHit = true;
                return;
            }
    }
    let textbox = document.getElementById("textbox");
    let bottomText = document.getElementById("bottomText");
    if (this.firstHit===true){
      bottomText.innerHTML += "How many did I get right?<br><br>";
    }
    let userInput = document.getElementById("numRight");
    //console.log(userInput);
    userInput.removeAttribute("hidden");
    //console.log(userInput.value);
    if (parseInt(userInput.value)>=6 || (userInput.value==="" && this.firstHit===false)){
      textbox.innerHTML += "That's not a valid input. Please try again with a number between 0 and 5.<br>";
    } else {
      console.log(this.guessArray);
      this.firstHit = false;
      let guesses = 0;
      let n = 10000;
      let left = 10000;
      if (parseInt(userInput.value)<5 || userInput.value===""){
        if (userInput.value <= 5 && userInput.value !== ""){
          textbox.innerHTML += userInput.value + " correct numbers.<br>"
        }
        guesses++;
        let ran = Math.floor(Math.random() * n);
        let loops = 0;
        while (this.guessArray[ran]===-1){
          //console.log(ran);
            ran = Math.floor(Math.random() * n);
            loops++;
            if (loops>100000){
                let z = 0;
                while (this.guessArray[ran]===-1){
                        ran = z;
                        z++;
                    }
                break;
                }
            }
        let guessNums = document.getElementsByClassName("guessNums");
        for (let aa=0;aa<5;aa++){
            textbox.innerHTML += this.guessArray[ran][aa];
            guessNums[aa].innerHTML = this.guessArray[ran][aa];
        }
        textbox.innerHTML += "<br>";
  } else {

  }
}
  }
  reduceChoices(num,n,currentArray){
    let newN = 0;
    for (let g=0;g<n;g++){
        if (this.guessArray[g]!==-1){
            let count =0;
            for (let h=0;h<5;h++){
                if (this.guessArray[g][h]===this.guessArray[currentArray][h]){
                  
                    count++;
                }
            }
            if (g===0){
              console.log(count);
            }
            if (count!=num && count!=5 && g!=currentArray){
                this.guessArray[g] = -1;
                newN++;
            }
        }
    }
    this.guessArray[currentArray] = -1;
    newN++;
    return newN;
}
}