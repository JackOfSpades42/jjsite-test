import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-num',
  templateUrl: './num.component.html',
  styleUrls: ['./num.component.css']
})
export class NumComponent implements OnInit {
  guessArray = [];
  firstHit = true;
  left = 100000;
  constructor(
  ) { }

  ngOnInit() {
    this.makeArray();
    let textbox = document.getElementById("textbox");
    //textbox.innerHTML += "I am thinking of a 5 digit number between 00000 and 99999<br>You input a number<br>and I will tell you how many are in the proper position and if your guess is an optimal guess.";
    textbox.innerHTML += "Please write down 5 seperate digits between 0 and 9.<br>I will show a list of numbers<br>and you tell me how many numbers I got in the right position.<br>If necessary you may use the spaces on the right to input your digits, but these spaces will not be used to choose my guesses (pinky promise)<br>";
    //console.log(this.guessArray);
    
  }
  makeArray(){
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
  }
  go(userInput: any){
    console.log(this.guessArray);
    let compNums = document.getElementsByClassName("guessNums");
    let compareNumber = this.getCompareNumber();
    //console.log(compNums[0].innerHTML);
    //console.log(compareNumber);
    let textbox = document.getElementById("textbox");
    let bottomText = document.getElementById("bottomText");
    let n =100000;
    let inputBox = document.getElementById("inputBox");
    //let userInput = document.getElementById("numRight");
    if (this.firstHit===true){
      bottomText.innerHTML += "How many did I get right?<br><br>";
      inputBox.removeAttribute("hidden");
      userInput = "";
    }
    if (parseInt(userInput)===5){
      let finishString = "Great! I guessed your number! Hit \"Go!\" to go again.<br>";
      textbox.innerHTML += finishString;
      this.firstHit = true;
      bottomText.innerHTML = "";
      inputBox.setAttribute("hidden","");
      inputBox.setAttribute("value","");
      this.left = 100000;
      this.makeArray();
      return;
    }
    if (parseInt(userInput)<5 && userInput !==""){
      console.log ("left = " + this.left);
            this.left -= this.reduceChoices(parseInt(userInput),n,compareNumber);
            if (this.left<=0){
                console.log("too few left: " + this.left);
                textbox.innerHTML += "Are you sure? Maybe try it again.<br>";
                bottomText.innerHTML = "";
                inputBox.setAttribute("hidden","");
                this.firstHit = true;
                this.left = 100000;
                this.makeArray();
                return;
            }
    }
    if (parseInt(userInput)>=6 || (userInput==="" && this.firstHit===false)){
      textbox.innerHTML += "That's not a valid input. Please try again with a number between 0 and 5.<br>";
    } else {
      this.firstHit = false;
      let guesses = 0;
      if (parseInt(userInput)<5 || userInput===""){
        if (userInput <= 5 && userInput !== ""){
          textbox.innerHTML += userInput + " correct numbers.<br>"
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
  getCompareNumber(){
    let compNums = document.getElementsByClassName("guessNums");
    let returnNum = 0;
    returnNum += parseInt(compNums[0].textContent)*10000;
    returnNum += parseInt(compNums[1].textContent)*1000;
    returnNum += parseInt(compNums[2].textContent)*100;
    returnNum += parseInt(compNums[3].textContent)*10;
    returnNum += parseInt(compNums[4].textContent);
    return returnNum;
  }
  reduceChoices(num,n,currentArray){
    //console.log("currentArray= " + currentArray);
    //console.log("num= " + num);
    let newN = 0;
    for (let g=0;g<n;g++){
        if (this.guessArray[g]!==-1){
            let count =0;
            //console.log("compare " + this.guessArray[currentArray] + " " + this.guessArray[g]);
            for (let h=0;h<5;h++){
              //console.log(this.guessArray[g][h]===this.guessArray[currentArray][h]);
                if (this.guessArray[g][h]===this.guessArray[currentArray][h]){
                    //console.log(this.guessArray[g][h] + " = " + this.guessArray[currentArray][h]);
                    count++;
                    
                }
            }
            if (count!==num && count!==5 && g!==currentArray){
                this.guessArray[g] = -1;
                newN++;
            }
            //console.log("Count= " +count);
        }
    }
    this.guessArray[currentArray] = -1;
    newN++;
    console.log("newN: " +newN);
    return newN;
}
}