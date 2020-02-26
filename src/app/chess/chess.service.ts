import { Injectable } from '@angular/core';

@Injectable()
export class Xavier {
boardString;
board;
canCastle;
CurrentMove;
lastmove;
checkShowing;
gameover;
pieces;
  constructor() {
    this.boardString = 'bRbNbBbQbKbBbNbR'

    for (var pawnCountb=0;pawnCountb<8;pawnCountb++){
      this.boardString += 'bP';
    }
    for (var Ecount=0;Ecount<32;Ecount++){
      this.boardString += 'ee';
    }
    for (var pawnCountw=0;pawnCountw<8;pawnCountw++){
      this.boardString += 'wP';
    }
this.boardString += 'wRwNwBwQwKwBwNwRw';
this.board = this.newBoard(this.boardString);
this.canCastle = {
    wKmoved : 0,
    bKmoved : 0,
    bRLmoved : 0,
    bRRmoved : 0,
    wRRmoved : 0,
    wRLmoved : 0
}
this.CurrentMove = 0;
this.lastmove = [];
this.checkShowing = "";
this.gameover = "";
this.pieces = this.createPiecesArr(this.board);
   }

addBorder(num){
    var boxes = document.getElementsByClassName("box64");
    boxes[num].style.border = "2px solid rgb(204,0,0)";
}

addSelectionBorder(num){
    var boxes = document.getElementsByClassName("box64");
    boxes[num].style.border = "2px solid rgb(1,1,1)";
    var kingspace = boardString.indexOf(boardString[128] + "K")/2;
    if (check(boardString,boardString[128]) && kingspace!==num){
        boxes[kingspace].style.border = "2px solid rgb(128,0,0)";
    }
    if (lastmove.length>0){
        boxes[lastmove[0]].style.border = "2px solid green";
        boxes[lastmove[1]].style.border = "2px solid green";
    }
}

clearBorders(){
    var redBoxes = document.getElementsByClassName("box64red");
    var whiteBoxes = document.getElementsByClassName("box64white");
    for (var boxcount=0;boxcount<redBoxes.length;boxcount++){
        redBoxes[boxcount].style.border = "2px solid rgb(192, 137, 129)";
        whiteBoxes[boxcount].style.border = "2px solid blanchedalmond";
    }
}

arrayEqual(a,b){
    if (a===null || b===null){
        return false;
    } else if (a.length!==b.length){
        return false;
    }
    for (var comp=0;comp<a.length;a++){
        if (a[comp]!==b[comp]){
            return false;
        }
    }
    return true;
}

opposite(color){
    if (color==="w"){
        return "b";
    }
    return "w";
}

findFile(num){
    let returnArr = ["a","b","c","d","e","f","g","h"];
    return returnArr[num];
}

findRank(num){
    return 8 - num;
}

createPiecesArr(board){
    var newPiecesArr = [];
    for (var piecesCount=0;piecesCount<board.length-1;piecesCount++){
        if (board[piecesCount]!=='ee'){
            newPiecesArr[piecesCount] = addPiece(board[piecesCount]);
        }
    }
    return newPiecesArr;
}

swapBoardString(str,numFrom,numTo){
  let newString = "";
        if (numFrom<numTo){
            newString = str.substring(0,numFrom*2);
            newString += "ee";
            newString += str.substring(numFrom*2+2,numTo*2);
            newString += str[numFrom*2];
            newString += str[numFrom*2+1];
            newString += str.substring(numTo*2+2,str.length-1);
            newString += this.opposite(str[128]);
        } else {
            newString = str.substring(0,numTo*2);
            newString += str[numFrom*2];
            newString += str[numFrom*2+1];
            newString += str.substring(numTo*2+2,numFrom*2);
            newString += "ee";
            newString += str.substring(numFrom*2+2,str.length-1);
            newString += this.opposite(str[128]);
        }
        return newString;
}

check (str,color){
    if (color===undefined){
        var checkw = this.check(str,"w");
        var checkb = this.check(str,"b");
        if (!checkb && !checkw){
            return false;
        } else {
            return true;
        }
    }
    else {
        var king = color + "K";
        var kingSpace = Math.floor((str.indexOf(king)/2));
        var bishCheck = getBishopMoves(kingSpace,color,str,function(str,num){return false});
        var rookCheck = getRookMoves(kingSpace,color,str,function(str,num){return false});
        var knightCheck = getKnightMoves(kingSpace,color,str,function(str,num){return false});
        var kingCheck = getKingMoves(kingSpace,color,str,function(str,num){return false});
        var checkBoard = newBoard(str);
        var checkPieces = this.createPiecesArr(checkBoard);
        if (bishCheck.length>0){
            for (var bcheck=0;bcheck<bishCheck.length;bcheck++){
                if (checkPieces[bishCheck[bcheck][1]]){
                    if (checkPieces[bishCheck[bcheck][1]].type==="B" || checkPieces[bishCheck[bcheck][1]].type==="Q"){
                        return true;
                    }
                }
            }
        }
        if (rookCheck.length>0){
            for (var rcheck=0;rcheck<rookCheck.length;rcheck++){
                if (checkPieces[rookCheck[rcheck][1]]){
                    if (checkPieces[rookCheck[rcheck][1]].type==="R" || checkPieces[rookCheck[rcheck][1]].type==="Q"){
                        return true;
                    }
                }
            }
        }
        if (knightCheck.length>0){
            for (var kcheck=0;kcheck<knightCheck.length;kcheck++){
                if (checkPieces[knightCheck[kcheck][1]]){
                    if (checkPieces[knightCheck[kcheck][1]].type==="N"){
                        return true;
                    }
                }
            }
        }
        var kingCheckArr = [-1,1,8,-8,7,-7,9,-9];
        if (color==="w"){
            if (checkPieces[kingSpace-7]){
                if (checkPieces[kingSpace-7].type==="P" && checkPieces[kingSpace-7].color==="b" && (kingSpace-7)%8!==0){
                    return true;
                }
            }
            if (checkPieces[kingSpace-9]){
                if (checkPieces[kingSpace-9].type==="P" && checkPieces[kingSpace-9].color==="b" && (kingSpace-9)%8!==7){
                    return true;
                }
            }
            for (var kinc=0;kinc<8;kinc++){
                if (checkPieces[kingSpace+kingCheckArr[kinc]]){
                    if(checkPieces[kingSpace+kingCheckArr[kinc]].type==="K" && checkPieces[kingSpace+kingCheckArr[kinc]].color==="b"){
                        return true;
                    }
                }
            }
        } else {
            if (checkPieces[kingSpace+7]){
                if (checkPieces[kingSpace+7].type==="P" && checkPieces[kingSpace+7].color==="w" && (kingSpace+7)%8!==7) {
                    return true;
                }
            }
            if (checkPieces[kingSpace+9]){
                if (checkPieces[kingSpace+9].type==="P" && checkPieces[kingSpace+9].color==="w" && (kingSpace+9)%8!==0){
                    return true;
                }
            }
            for (var kinc2=0;kinc2<8;kinc2++){
                if (checkPieces[kingSpace+kingCheckArr[kinc2]]){
                    if(checkPieces[kingSpace+kingCheckArr[kinc2]].type==="K" && checkPieces[kingSpace+kingCheckArr[kinc2]].color==="w"){
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

function checkmate(str){
    if (gameover!==""){
        return true;
    }
    var checkmateBoard = newBoard(str);
    var checkmatePieces = createPiecesArr(checkmateBoard);
    var colorMated = str[128];
    var allMoves = [];
    if (colorMated==="w"){
        for (var mateCheck=0;mateCheck<checkmatePieces.length;mateCheck++){
            if (checkmatePieces[mateCheck]){
                if (checkmatePieces[mateCheck].color===colorMated){
                    var newMoves = findMoves(mateCheck,checkmatePieces[mateCheck].type,colorMated,str);
                    if (newMoves.length===0){
                        return false;
                    }
                }
            }
        }
    } else {
        for (var mateCheck=63;mateCheck>=0;mateCheck--){
            if (checkmatePieces[mateCheck]){
                if (checkmatePieces[mateCheck].color===colorMated){
                    console.time("checkmate");
                    var newMoves = findMoves(mateCheck,checkmatePieces[mateCheck].type,colorMated,str);
                    console.timeEnd("checkmate");
                    if (newMoves.length>0){
                        return false;
                    }
                }
            }
        }        
    }
    if (allMoves.length>0){
        return false;
    }
    if (!check(str,str[128]) && allMoves.length<1){
        return "s";
    }
    return true;
}

function stalemate(str){
    var stalemateBoard = newBoard(str);
    var stalematePieces = createPiecesArr(stalemateBoard);
    var color = str[128];
    var allMoves = [];
    for (var mateCheck=0;mateCheck<stalematePieces.length;mateCheck++){
        if (stalematePieces[mateCheck]){
            if (stalematePieces[mateCheck].color===color){
                var newMoves = findMoves(mateCheck,stalematePieces[mateCheck].type,color,str);
                if (newMoves.length>0){
                    return false;
                }
            }
        }
    }
    if (allMoves.length>0){
        return false;
    }
    return true;
}

function getPromotePiece(str){
    var promoteBox = document.getElementsByClassName("promoteBox");
    promoteBox[0].style.display = "block";
    var promoteButton = document.getElementById("promoteButton");
    promoteButton.onclick = function(){promote(str)};
}

function promote(str){
    var promotedTo = document.getElementsByName("promo");
    for (var findPiece=0;findPiece<4;findPiece++){
        if (promotedTo[findPiece].checked){
            promotedTo = promotedTo[findPiece].value;
            var promoteBox = document.getElementsByClassName("promoteBox");
            promoteBox[0].style.display = "none";
            break;
        }
        if (findPiece===3 && !promotedTo[findPiece].checked){
            return;
        }
    }
    promoteBoard = newBoard(str);
    promotePieces = createPiecesArr(promoteBoard);
    for (var firstCheck=0;firstCheck<8;firstCheck++){
        if (promotePieces[firstCheck]){
            if (promotePieces[firstCheck].type==="P"){
                var newStr = str.substring(0,firstCheck*2);
                newStr += "w" + promotedTo;
                newStr += str.substring(firstCheck*2+2,str.length);
                boardString = newStr;
                promoteBoard=newBoard(newStr);
                promotePieces = createPiecesArr(promoteBoard);
                pieces = promotePieces;
                var previousMoves = document.getElementsByClassName("previousMoves");
                previousMoves[previousMoves.length-1].onclick = function(){goBackTo(newStr)};
                removeImages();
                doThing();
            }
        }
    }
    for (var secondCheck=56;secondCheck<64;secondCheck++){
        if (promotePieces[secondCheck]){
            if (promotePieces[secondCheck].type==="P"){
                var newStr = str.substring(0,secondCheck*2);
                newStr += "b" + promotedTo;
                newStr += str.substring(secondCheck*2+2,str.length);
                boardString = newStr;
                promoteBoard=newBoard(newStr);
                promotePieces = createPiecesArr(promoteBoard);
                pieces = promotePieces;
                var previousMoves = document.getElementsByClassName("previousMoves");
                previousMoves[previousMoves.length-1].onclick = function(){goBackTo(newStr)};
                removeImages();
                doThing();
            }
        }
    }
}

function getBishopMoves(num,color,str,func){
    var thisMoveBoard = newBoard(str);
    var thisMovePieces = createPiecesArr(thisMoveBoard);
    for (var topRightFile=1;topRightFile<8;topRightFile++){
        if (num-(topRightFile*7)>=0 && (num-(topRightFile*7))%8!==0){
            if (!thisMovePieces[num-(topRightFile*7)]){
                if (!func(swapBoardString(str,num,num-(topRightFile*7)),color)){
                    thisMovePieces[num].moves.push([num,num-(topRightFile*7)]);
                }
            } else if (thisMovePieces[num-(topRightFile*7)].color===opposite(color)){
                if (!func(swapBoardString(str,num,num-(topRightFile*7)),color)){
                    thisMovePieces[num].moves.push([num,num-(topRightFile*7)]);
                }
                break;
            } else if (thisMovePieces[num-(topRightFile*7)].color===color){
                break;
            }
        } else {
            break;
        }
    }
    for (var topLeftFile=1;topLeftFile<8;topLeftFile++){
        if (num-(topLeftFile*9)>=0 && (num-(topLeftFile*9))%8!==7){
            if (!thisMovePieces[num-(topLeftFile*9)]){
                if (!func(swapBoardString(str,num,num-(topLeftFile*9)),color)){
                    thisMovePieces[num].moves.push([num,num-(topLeftFile*9)]);
                }
            } else if (thisMovePieces[num-(topLeftFile*9)].color===opposite(color)){
                if (!func(swapBoardString(str,num,num-(topLeftFile*9)),color)){
                    thisMovePieces[num].moves.push([num,num-(topLeftFile*9)]);
                }
                break;
            } else if (thisMovePieces[num-(topLeftFile*9)].color===color){
                break;
            }
        } else {
            break;
        }
    }
    for (var bottomRightFile=1;bottomRightFile<8;bottomRightFile++){
        if (num+(bottomRightFile*7)<=63 && (num+(bottomRightFile*7))%8!==7){
            if (!thisMovePieces[num+(bottomRightFile*7)]){
                if (!func(swapBoardString(str,num,num+(bottomRightFile*7)),color)){
                    thisMovePieces[num].moves.push([num,num+(bottomRightFile*7)]);
                }
            } else if (thisMovePieces[num+(bottomRightFile*7)].color===opposite(color)){
                if (!func(swapBoardString(str,num,num+(bottomRightFile*7)),color)){
                    thisMovePieces[num].moves.push([num,num+(bottomRightFile*7)]);
                }
                break;
            } else if (thisMovePieces[num+(bottomRightFile*7)].color===color){
                break;
            }
        } else {
            break;
        }
    }
    for (var bottomLeftFile=1;bottomLeftFile<8;bottomLeftFile++){
        if (num+(bottomLeftFile*9)<=63 && (num+(bottomLeftFile*9))%8!==0){
            if (!thisMovePieces[num+(bottomLeftFile*9)]){
                if (!func(swapBoardString(str,num,num+(bottomLeftFile*9)),color)){
                    thisMovePieces[num].moves.push([num,num+(bottomLeftFile*9)]);
                }
            } else if (thisMovePieces[num+(bottomLeftFile*9)].color===opposite(color)){
                if (!func(swapBoardString(str,num,num+(bottomLeftFile*9)),color)){
                    thisMovePieces[num].moves.push([num,num+(bottomLeftFile*9)]);
                }
                break;
            } else if (thisMovePieces[num+(bottomLeftFile*9)].color===color){
                break;
            }
        } else {
            break;
        }
    }
    return thisMovePieces[num].moves;
}
function getRookMoves(num,color,str,func){
    var thisMoveBoard = newBoard(str);
    var thisMovePieces = createPiecesArr(thisMoveBoard);
    var lastRightSpace = Math.floor(num/8)*8 + 7;
    var lastLeftSpace = Math.floor(num/8)*8;
    for (var rightSideRow=1;rightSideRow<8;rightSideRow++){
        if (num+rightSideRow<=lastRightSpace){
            if (!thisMovePieces[num+rightSideRow]){
                if (!func(swapBoardString(str,num,num+rightSideRow),color)){
                    thisMovePieces[num].moves.push([num,num+rightSideRow]);
                }
            } else if (thisMovePieces[num+rightSideRow].color===opposite(color)){
                if (!func(swapBoardString(str,num,num+rightSideRow),color)){
                    thisMovePieces[num].moves.push([num,num+rightSideRow]);
                }
                break;
            } else if (thisMovePieces[num+rightSideRow].color === color){
                break;
            }
        } else {
            break;
        }
    }
    for (var leftSideRow=1;leftSideRow<8;leftSideRow++){
        if (num-leftSideRow>=lastLeftSpace){
            if(!thisMovePieces[num-leftSideRow]){
                if (!func(swapBoardString(str,num,num-leftSideRow),color)){
                    thisMovePieces[num].moves.push([num,num-leftSideRow]);
                }
            } else if (thisMovePieces[num-leftSideRow].color===opposite(color)){
                if (!func(swapBoardString(str,num,num-leftSideRow),color)){
                    thisMovePieces[num].moves.push([num,num-leftSideRow]);
                }
                break;
            } else if (thisMovePieces[num-leftSideRow].color === color){
                break;
            }
        } else {
            break;
        }
    }
    for (var topColumn=1;topColumn<8;topColumn++){
        if (num-(topColumn*8)>=0){
            if (!thisMovePieces[num-(topColumn*8)]){
                if (!func(swapBoardString(str,num,num-(topColumn*8)),color)){
                    thisMovePieces[num].moves.push([num,num-(topColumn*8)]);
                }
            } else if (thisMovePieces[num-(topColumn*8)].color===opposite(color)){
                if (!func(swapBoardString(str,num,num-(topColumn*8)),color)){
                    thisMovePieces[num].moves.push([num,num-(topColumn*8)]);
                }
                break;
            } else if (thisMovePieces[num-(topColumn*8)].color===color){
                break;
            }
        } else {
            break;
        }
    }
    for (var bottomColumn=1;bottomColumn<8;bottomColumn++){
        if (num+(bottomColumn*8)<=63){
            if (!thisMovePieces[num+(bottomColumn*8)]){
                if (!func(swapBoardString(str,num,num+(bottomColumn*8)),color)){
                    thisMovePieces[num].moves.push([num,num+(bottomColumn*8)]);
                }
            } else if (thisMovePieces[num+(bottomColumn*8)].color===opposite(color)){
                if (!func(swapBoardString(str,num,num+(bottomColumn*8)),color)){
                    thisMovePieces[num].moves.push([num,num+(bottomColumn*8)]);
                }
                break;
            } else if (thisMovePieces[num+(bottomColumn*8)].color===color){
                break;
            }
        }  else {
            break;
        }
    }
    return thisMovePieces[num].moves;
}



function getKingMoves(num,color,str,func){
    var movesArr = [];
    if(num+1<64){
        if (num+8<64){
            var checkString = swapBoardString(str,num,num+8);
            if (!func(checkString,color)){
                if (!pieces[num+8]){
                    movesArr.push([num,num+8]);
                } else if (pieces[num+8].color===opposite(color)){
                    movesArr.push([num,num+8]);
                }
            }
        } 
        if (num+7<64){
            var checkString = swapBoardString(str,num,num+7);
            if (!func(checkString,color)){
                if (!pieces[num+7] && num%8!==0){
                    movesArr.push([num,num+7]);
                } else if(!pieces[num+7]){

                } else if (pieces[num+7].color===opposite(color) && num%8!==0){
                    movesArr.push([num,num+7]);
                }
            }
        }
        if (num+9<64){
            var checkString = swapBoardString(str,num,num+9);
            if (!func(checkString,color)){
                if (!pieces[num+9] && num%8!==7){
                    movesArr.push([num,num+9]);
                } else if(!pieces[num+9]){

                } else if (pieces[num+9].color===opposite(color) && num%8!==7){
                    movesArr.push([num,num+9]);
                }
            }
        }
        var checkString = swapBoardString(str,num,num+1);
        if (!func(checkString,color)){
            if (!pieces[num+1] & num%8!==7){
                movesArr.push([num,num+1]);
            } else if(!pieces[num+1]){

            } else if (pieces[num+1].color===opposite(color) && num%8!==7){
                movesArr.push([num,num+1]);
            }
        }
    }
    if (num-1>=0){
        if (num-8>=0){
            var checkString = swapBoardString(str,num,num-8);
            if (!func(checkString,color)){
                if (!pieces[num-8]){
                    movesArr.push([num,num-8]);
                } else if (pieces[num-8].color===opposite(color)){
                    movesArr.push([num,num-8]);
                }
            }
        } 
        if (num-7>=0){
            var checkString = swapBoardString(str,num,num-7);
            if (!func(checkString,color)){
                if (!pieces[num-7] && num%8!==7){
                    movesArr.push([num,num-7]);
                } else if(!pieces[num-7]){

                } else if (pieces[num-7].color===opposite(color) && num%8!==7){
                    movesArr.push([num,num-7]);
                }
            }
        }
        if (num-9>=0){
            var checkString = swapBoardString(str,num,num-9);
            if (!func(checkString,color)){
                if (!pieces[num-9] && num%8!==0){
                    movesArr.push([num,num-9]);
                } else if(!pieces[num-9]){

                } else if (pieces[num-9].color===opposite(color) && num%8!==0){
                    movesArr.push([num,num-9]);
                }
            }
        }
        var checkString = swapBoardString(str,num,num-1);
        if (!func(checkString,color)){
            if (!pieces[num-1] && num%8!==0){
                movesArr.push([num,num-1]);
            } else if(!pieces[num-1]){

            } else if (pieces[num-1].color===opposite(color) && num%8!==0){
                movesArr.push([num,num-1]);
            }
        }
    }
    if (color==="w"){
        if (!canCastle.wKmoved && !canCastle.wRRmoved){
            if (!pieces[61] && !pieces[62] && !func(str,"w")){
                var checkString = swapBoardString(str,num,61);
                var checkString2 = swapBoardString(str,num,62);
                if (!func(checkString,"w") && !func(checkString2,"w")){
                    movesArr.push([num,62]);
                }
            }
        }
        if (!canCastle.wKmoved && !canCastle.wRLmoved){
            if (!pieces[59] && !pieces[58] && !func(str,"w")){
                var checkString = swapBoardString(str,num,58);
                var checkString2 = swapBoardString(str,num,59);
                if (!func(checkString,"w") && !func(checkString2,"w")){
                    movesArr.push([num,58]);
                }
            }
        }
    }
    if (color==="b"){
        if (!canCastle.bKmoved && !canCastle.bRRmoved){
            if (!pieces[5] && !pieces[6] && !func(str,"b")){
                var checkString = swapBoardString(str,num,5);
                var checkString2 = swapBoardString(str,num,6);
                if (!func(checkString,"b") && !func(checkString2,"b")){
                    movesArr.push([num,6]);
                }
            }
        }
        if (!canCastle.bKmoved && !canCastle.bRLmoved){
            if (!pieces[3] && !pieces[2] && !func(str,"b")){
                var checkString = swapBoardString(str,num,3);
                var checkString2 = swapBoardString(str,num,2);
                if (!func(checkString,"b") && !func(checkString2,"b")){
                    movesArr.push([num,2]);
                }
            }
        }
    }
    return movesArr;
}

function getKnightMoves(num,color,str,func){
    var thisMoveBoard = newBoard(str);
    var thisMovePieces = createPiecesArr(thisMoveBoard);
    if (num-17 >=0){
        if (num%8!==0){
            if (!thisMovePieces[num-17]){
                if (!func(swapBoardString(str,num,num-17),color)){
                    thisMovePieces[num].moves.push([num,num-17]);
                }
            } 
            else if (thisMovePieces[num-17].color===opposite(color)){
                if (!func(swapBoardString(str,num,num-17),color)){
                    thisMovePieces[num].moves.push([num,num-17]);
                }
            }
        }
    }
    
    if (num-15 >=0){
        if (num%8!==7){
            if (!thisMovePieces[num-15]){
                if (!func(swapBoardString(str,num,num-15),color)){
                    thisMovePieces[num].moves.push([num,num-15]);
                }
            } 
            else if (thisMovePieces[num-15].color===opposite(color)){
                if (!func(swapBoardString(str,num,num-15),color)){
                    thisMovePieces[num].moves.push([num,num-15]);
                }
            }
        }
    }
    
    if (num-10 >=0){
        if (num%8>1){
            if (!thisMovePieces[num-10]){
                if (!func(swapBoardString(str,num,num-10),color)){
                    thisMovePieces[num].moves.push([num,num-10]);
                }
            } 
            else if (thisMovePieces[num-10].color===opposite(color)){
                if (!func(swapBoardString(str,num,num-10),color)){
                    thisMovePieces[num].moves.push([num,num-10]);
                }
            }
        }
    }
    
    if (num-6 >=0){
        if (num%8<6){
            if (!thisMovePieces[num-6]){
                if (!func(swapBoardString(str,num,num-6),color)){
                    thisMovePieces[num].moves.push([num,num-6]);
                }
            } 
            else if (thisMovePieces[num-6].color===opposite(color)){
                if (!func(swapBoardString(str,num,num-6),color)){
                    thisMovePieces[num].moves.push([num,num-6]);
                }
            }
        }
    }
   
    if (num+17<=63){
        if (num%8!==7){
            if (!thisMovePieces[num+17]){
                if (!func(swapBoardString(str,num,num+17),color)){
                    thisMovePieces[num].moves.push([num,num+17]);
                }
            } 
            else if (thisMovePieces[num+17].color===opposite(color)){
                if (!func(swapBoardString(str,num,num+17),color)){
                    thisMovePieces[num].moves.push([num,num+17]);
                }
            }
        }
    }
    
    if (num+15<=63){
        if (num%8!==0){
            if (!thisMovePieces[num+15]){
                if (!func(swapBoardString(str,num,num+15),color)){
                    thisMovePieces[num].moves.push([num,num+15]);
                }
            }
            else if (thisMovePieces[num+15].color===opposite(color)){
                if (!func(swapBoardString(str,num,num+15),color)){
                    thisMovePieces[num].moves.push([num,num+15]);
                }
            }
        }
    }
    
    if (num+10<=63){
        if (num%8<6){
            if (!thisMovePieces[num+10]){
                if (!func(swapBoardString(str,num,num+10),color)){
                    thisMovePieces[num].moves.push([num,num+10]);
                }
            } 
            else if (thisMovePieces[num+10].color===opposite(color)){
                if (!func(swapBoardString(str,num,num+10),color)){
                    thisMovePieces[num].moves.push([num,num+10]);
                }
            }
        }
    }
    
    if (num+6<=63){
        if (num%8>1){
            if (!thisMovePieces[num+6]){
                if (!func(swapBoardString(str,num,num+6),color)){
                    thisMovePieces[num].moves.push([num,num+6]);
                }
            } 
            else if (thisMovePieces[num+6].color===opposite(color)){
                if (!func(swapBoardString(str,num,num+6),color)){
                    thisMovePieces[num].moves.push([num,num+6]);
                }
            }
        }
    }
    return thisMovePieces[num].moves;
}

function getPawnMoves(num,color,str,func){
    var thisMoveBoard = newBoard(str);
    var thisMovePieces = createPiecesArr(thisMoveBoard);
    if (color==="w"){
        var EP1 = [num-15,num+1];
        var EP2 = [num-17,num-1];
        if (thisMovePieces[num+1]){
            if (arrayEqual(EP1,lastmove) && thisMovePieces[num+1].type==="P" && num%8!==7){
                if (!func(swapBoardString(str,num,num-7),color)){
                    thisMovePieces[num].moves.push([num,num-7]);
                }
            }
        }
        if (thisMovePieces[num-1]){
            if (arrayEqual(EP2,lastmove) && thisMovePieces[num-1].type==="P" && num%8!==0){
                if (!func(swapBoardString(str,num,num-9),color)){
                    thisMovePieces[num].moves.push([num,num-9]);
                }
            }
        }
        if (thisMovePieces[num-7]){
            if (thisMovePieces[num-7]&& thisMovePieces[num-7].color==="b" && num%8!==7){
                if (!func(swapBoardString(str,num,num-7),color)){
                    thisMovePieces[num].moves.push([num,num-7]);
                }
            }
        }
        if (thisMovePieces[num-9]){
            if (thisMovePieces[num-9] && thisMovePieces[num-9].color==="b" && num%8!==0){
                if (!func(swapBoardString(str,num,num-9),color)){
                    thisMovePieces[num].moves.push([num,num-9]);
                }
            }
        }
        if (!thisMovePieces[num-8]){
            if (!func(swapBoardString(str,num,num-8),color)){
                thisMovePieces[num].moves.push([num,num-8]);
            }
            if (num/8>=6 && !thisMovePieces[num-16]){
                if (!func(swapBoardString(str,num,num-16),color)){
                    thisMovePieces[num].moves.push([num,num-16]);
                }
            }
        }
    } else if (color==="b"){
        if (thisMovePieces[num+1]){
            if (arrayEqual(lastmove,[num+17,num+1]) && thisMovePieces[num+1].type==="P" && num%8!==0){
                if (!func(swapBoardString(str,num,num+9),color)){
                    thisMovePieces[num].moves.push([num,num+9]);
                }
            }
        }
        if (thisMovePieces[num-1]){
            if (arrayEqual(lastmove,[num+15,num-1]) && thisMovePieces[num-1].type==="P" && num%8!==7){
                if (!func(swapBoardString(str,num,num+7),color)){
                    thisMovePieces[num].moves.push([num,num+7]);
                }
            }
        }
        if (thisMovePieces[num+7]){
            if (thisMovePieces[num+7]&& thisMovePieces[num+7].color==="w" && num%8!==0){
                if (!func(swapBoardString(str,num,num+7),color)){
                    thisMovePieces[num].moves.push([num,num+7]);
                }
            }
        }
        if (thisMovePieces[num+9]){
            if (thisMovePieces[num+9] && thisMovePieces[num+9].color==="w" && num%8!==7){
                if (!func(swapBoardString(str,num,num+9),color)){
                    thisMovePieces[num].moves.push([num,num+9]);
                }
            }
        }
        if (!thisMovePieces[num+8]){
            if (!func(swapBoardString(str,num,num+8),color)){
                thisMovePieces[num].moves.push([num,num+8]);
            }
            if (num/8<2 && !thisMovePieces[num+16]){
                if (!func(swapBoardString(str,num,num+16),color)){
                    thisMovePieces[num].moves.push([num,num+16]);
                }
            }
        }
    }
    return thisMovePieces[num].moves;
}

function findMoves(num,type,color,str){
    var moveArr = [];
    if (type==="P"){
        moveArr = getPawnMoves(num,color,str,check);
    } else if (type==="N"){
        moveArr = getKnightMoves(num,color,str,check);
    } else if (type==="B"){
        moveArr = getBishopMoves(num,color,str,check);
    } else if (type==="R"){
        moveArr = getRookMoves(num,color,str,check);
    } else if (type==="Q"){
        moveArr = getBishopMoves(num,color,str,check);
        var qRookMoves = getRookMoves(num,color,str,check);
        for (var addRookMoves=0;addRookMoves<qRookMoves.length;addRookMoves++){
            moveArr.push(qRookMoves[addRookMoves]);
        }
    } else if (type==="K"){
        moveArr = getKingMoves(num,color,str,check);
    }
    return moveArr;
}

function showMove(num,type,color,str){
    removeImages();
    board = newBoard(boardString);
    pieces = createPiecesArr(board);
    doThing();
    pieces[num].moves = [];
    clearBorders();
    pieces[num].moves = findMoves(num,type,color,str);
    addSelectionBorder(num);
    for (var mov=0;mov<pieces[num].moves.length;mov++){
        addBorder(pieces[num].moves[mov][1]);
        addDestinationFunction(num,pieces[num].moves[mov][1],str);
    }
    
}

function displayMove(num1,num2,str){
    var innerString = pieces[num1].type;
    var scoresheet = document.getElementById("scoresheet");
    if (pieces[num2]){
        innerString += "x";
    }
    innerString += findFile(num2%8);
    innerString += findRank(Math.floor(num2/8));
    if (pieces[num1].type==="P"){
        innerString = innerString.substring(1,innerString.length);
        if (innerString[0]==="x"){
            innerString = findFile(num1%8) + innerString;
        }
    }
    var newStr = swapBoardString(str,num1,num2);
    if (((num1===60 && num2===62) || (num1===4 && num2===6)) && pieces[num1].type==="K"){
        innerString = "O-O";
    } else if (((num1===60 && num2===58) || (num1===4 && num2===2)) && pieces[num1].type==="K"){
        innerString = "O-O-O";
    }
    if (check(newStr,newStr[128])){
        if (checkmate(newStr)===true){
            innerString += "#";
        } else {
            innerString += "+";
        }
    }
    if (scoresheet.rows[scoresheet.rows.length-1].cells.length===3){
        var newRow = scoresheet.insertRow();
        var turnCell = newRow.insertCell();
        turnCell.innerHTML = scoresheet.rows.length + ".";
        var newCell = newRow.insertCell();
        newCell.style.width = "50px";
        var newBtn = document.createElement("button");
        newBtn.onclick = function (){goBackTo(newStr);}
        newBtn.innerHTML = innerString;
        newBtn.classList = "previousMoves";
        newCell.append(newBtn);
    } else {
        var newCell = scoresheet.rows[scoresheet.rows.length-1].insertCell();
        newCell.style.width = "50px";
        var newBtn = document.createElement("button");
        newBtn.onclick = function (){goBackTo(newStr);}
        newBtn.innerHTML = innerString;
        newBtn.classList = "previousMoves";
        newCell.append(newBtn);
    }
}

function goBackTo(str){
    removeImages();
    clearBorders();
    if (str===boardString){
        doThing();
    } else {
        var backBoard = newBoard(str);
        var backPieces = createPiecesArr(backBoard);
        var boxes = document.getElementsByClassName("box64");
        for (var backshow=0;backshow<backPieces.length;backshow++){
            if (backPieces[backshow]){
                boxes[backshow].append(backPieces[backshow].image);
            }
            clearOnclick(boxes[backshow]);
            boxes[backshow].style.cursor = "default";
        }
    }
}

function displayCapturedPiece(piece){
    var graveyard;
    if (piece.color==="w"){
        graveyard = document.getElementById("takenwhite");
    } else {
        graveyard = document.getElementById("takenblack");
    }
    var smallImg = new Image(40,40);
    smallImg.src = "./img/" + piece.color + piece.type + ".png";
    smallImg.style = "margin-top:0";
    graveyard.append(smallImg);
}

function Destination(num1,num2,str){
    removeImages();
    //console.log(num2);
    displayMove(num1,num2,str);
    if (pieces[num2]){
        displayCapturedPiece(pieces[num2]);
    }
    boardString = swapBoardString(boardString,num1,num2);
    if (num1===60 && num2===62){
        boardString = swapBoardString(boardString,63,61);
        boardString = boardString.substring(0,boardString.length-1);
        boardString += opposite(pieces[num1].color);
    } else if (num1===60 && num2===58){
        boardString = swapBoardString(boardString,56,59);
        boardString = boardString.substring(0,boardString.length-1);
        boardString += opposite(pieces[num1].color);
    } else if (num1===4 && num2===6){
        boardString = swapBoardString(boardString,7,5);
        boardString = boardString.substring(0,boardString.length-1);
        boardString += opposite(pieces[num1].color);
    } else if (num1===4 && num2===2){
        boardString = swapBoardString(boardString,0,3);
        boardString = boardString.substring(0,boardString.length-1);
        boardString += opposite(pieces[num1].color);
    }
    if (pieces[num1].type==="P"){
        if (num2===num1-7 && !pieces[num2]){
            var newString = boardString.substring(0,(num2)*2+16);
            newString += 'ee';
            newString += boardString.substring((num2)*2+18,boardString.length);
            boardString = newString;
        } else if (num2===num1-9 && !pieces[num2]){
            var newString = boardString.substring(0,(num2)*2+16);
            newString += 'ee';
            newString += boardString.substring((num2)*2+18,boardString.length);
            boardString = newString;
        } else if (num2===num1+7 && !pieces[num2]){
            var newString = boardString.substring(0,(num2)*2-16);
            newString += 'ee';
            newString += boardString.substring((num2)*2-14,boardString.length);
            boardString = newString;
        } else if (num2===num1+9 && !pieces[num2]){
            var newString = boardString.substring(0,(num2)*2-16);
            newString += 'ee';
            newString += boardString.substring((num2)*2-14,boardString.length);
            boardString = newString;
        }
        if (Math.floor(num2/8)===0 || Math.floor(num2/8)===7){
            getPromotePiece(boardString);
        }
    }
    board = newBoard(boardString);
    pieces = createPiecesArr(board);
    clearBorders();
    if (num1===60){
        canCastle.wKmoved = 1;
    } else if (num1===4){
        canCastle.bKmoved = 1;
    } else if (num1===0){
        canCastle.bRLmoved = 1;
    } else if (num1===7){
        canCastle.bRRmoved = 1;
    } else if (num1===63){
        canCastle.wRRmoved = 1;
    } else if (num1===56){
        canCastle.wRLmoved = 1;
    }
    lastmove = [num1,num2];
    var boxes = document.getElementsByClassName("box64");
    boxes[num1].style.border = "2px solid green";
    boxes[num2].style.border = "2px solid green";
    doThing();
}

function newBoard(str){
    var newBoard = [];
    for (var aa=0;aa<128;aa++){
        newBoard[aa/2] = str[aa] + str[aa+1];
        aa++;
    }
    newBoard[64] = str[128];
    return newBoard;
}

function addPiece (str){
    var newPiece = {};
    newPiece.color = str[0];
    newPiece.type = str[1];
    newPiece.image = new Image();
    newPiece.image.src = './img/' + str + '.png';
    newPiece.space;
    newPiece.moves = [];
    return newPiece;
}

function addBorderFunction(boxes,num){
    boxes.onclick = function(){addBorder(num);}
}

function addShowMoveFunction(boxes,num,type,color,str){
    boxes.onclick = function(){showMove(num,type,color,str);}
}

function clearOnclick(box){
    box.onclick = function(){}
}

function addDestinationFunction(num1,num2,str){
    var boxes = document.getElementsByClassName("box64");
    boxes[num2].onclick = function(){Destination(num1,num2,str);}
}

function doThing(){
    var boxes = document.getElementsByClassName("box64");
    for (var a=0;a<boxes.length;a++){
        boxes[a].style.cursor = "pointer";
    }
    for (var cc=0;cc<64;cc++){
        if (pieces[cc]){
            boxes[cc].append(pieces[cc].image);
            pieces[cc].space = cc;
            if (pieces[cc].color!==playerColor){
                clearOnclick(boxes[cc]);
            } else {
                addShowMoveFunction(boxes[cc],cc,pieces[cc].type,pieces[cc].color,boardString);
            }
        } else {
            clearOnclick(boxes[cc]);
        }
    }
    var CM2 = checkmate(boardString);
    if (check(boardString,boardString[128]) && CM2===false){
        if (document.body.lastChild!==checkShowing){
            document.body.append("Check!");
            checkShowing = document.body.lastChild;
        }
        var kingspace = boardString.indexOf(boardString[128] + "K");
        boxes[kingspace/2].style.border = "2px solid rgb(128,0,0)";
    } else if (!check(boardString,boardString[128]) && CM2!=="s"){
        if (document.body.lastChild===checkShowing){
            document.body.removeChild(document.body.lastChild);
        }
    } else if (CM2===true){
        if (document.body.lastChild!==gameover){
            document.body.append("Checkmate!");
            alert("Game Over!");
            gameover = document.body.lastChild;
        }
    } else if (CM2==="s"){
        alert("Stalemate!");
        document.body.append("Stalemate!");
    }
    if (boardString[128]===compColor && gameover===""){
        doCompMove(boardString)
    } else if (boardString[128]===playerColor){
        CurrentMove++;
        console.log(CurrentMove);
    }
}
function doCompMove(str){
    getCompMove(str);
}
function removeImages(){
    var boxes = document.getElementsByClassName("box64");
    for (var dd=0;dd<64;dd++){
        if (boxes[dd].lastChild.nodeType===1){
            boxes[dd].removeChild(boxes[dd].lastChild);
        }
    }
}

/*
*
*
*
*
*
*
*
*/
//The goods
var playerColor = "w";
var compColor = "b";
function pieceScore(type){
    if (type==="P"){
        return 1;
    } else if (type==="Q"){
        return 9;
    } else if (type==="N"){
        return 3;
    } else if (type==="B"){
        return 3;
    } else if (type==="R"){
        return 5;
    } else if (type==="K"){
        return 0;
    }
}

function inverse(Arr){
    return Arr.slice().reverse();
}

function getScore(str){
    var wPawnArr = [
        0,0,0,0,0,0,0,0,
        0.25,0.25,0.25,0.25,0.25,0.25,0.25,0.25,
        0,0,0,0,0,0,0,0,
        0,0,0,0.5,0.5,0,0,0,
        0,0,0,0.5,0.5,0,0,0,
        0,0,0,0,0,0,0,0,
        0.25,0.25,-0.25,-0.25,-0.25,-0.25,0.25,0.25,
        0,0,0,0,0,0,0,0,
    ]
    var bPawnArr = inverse(wPawnArr);
    var wRookArr = [
        0,0,0,0,0,0,0,0,
        0.25,0.25,0.25,0.25,0.25,0.25,0.25,0.25,
        -0.25,0,0,0,0,0,0,-0.25,
        -0.25,0,0,0,0,0,0,-0.25,
        -0.25,0,0,0,0,0,0,-0.25,
        -0.25,0,0,0,0,0,0,-0.25,
        -0.25,0,0,0,0,0,0,-0.25,
        -0.5,-1,0,0,0,0,-1,-0.5
    ];
    var bRookArr = inverse(wRookArr);
    var wBishArr = [
        -0.5,-0.25,-0.25,-0.25,-0.25,-0.25,-0.25,-0.5,
        -0.25,0,0,0,0,0,0,-0.25,
        -0.25,0,0.25,0.25,0.25,0.25,0,-0.25,
        -0.25,0,0.25,0.5,0.5,0.25,0,-0.25,
        -0.25,0,0.25,0.5,0.5,0.25,0,-0.25,
        -0.25,0,0.25,0.25,0.25,0.25,0,-0.25,
        -0.25,0,0,0,0,0,0,-0.25,
        -0.5,-0.25,-0.25,-0.25,-0.25,-0.25,-0.25,-0.5
    ]
    var bBishArr = inverse(wBishArr);
    var QueenArr = [
        -1,-0.5,-0.25,0,0,-0.25,-0.5,-1,
        -0.5,0,0,0,0,0,0,-0.5,
        -0.25,0,0,0,0,0,0,-0.25,
        -0.25,0,0,0,0,0,0,-0.25,
        -0.25,0,0,0,0,0,0,-0.25,
        -0.25,0,0,0,0,0,0,-0.25,
        -0.5,0,0,0,0,0,0,-0.5,
        -1,-0.5,-0.25,0,0,-0.25,-0.5,-1,
    ]
    var KnightArr = [
        -1,-0.4,-0.5,-0.5,-0.5,-0.5,-0.4,-1,
        -0.75,-0.25,-0.25,0,0,-0.25,-0.25,-0.75,
        -0.5,0,0.25,0.25,0.25,0,0,-0.5,
        -0.5,0.25,0.25,0.25,0.25,0.25,0.25,-0.5,
        -0.5,0.25,0.25,0.25,0.25,0.25,0.25,-0.5,
        -0.5,0,0.25,0.25,0.25,0,0,-0.5,
        -0.75,-0.25,-0.25,0,0,-0.25,-0.25,-0.75,
        -1,-0.4,-0.5,-0.5,-0.5,-0.5,-0.4,-1,
    ]
    scoreBoard = newBoard(str);
    scorePieces = createPiecesArr(scoreBoard);
    var score = 0;
    var compObj  = {
        B: 0,
        N: 0,
        R: 0
    };
    var playerObj = {
        B:0,
        N:0,
        R:0
    }
    var isCheck = check(str,str[128])
    if (isCheck){
        var CM = checkmate(str);
        if (CM===true){
            if (str[128]===playerColor){
                return 9001;
            } else if (str[128]===compColor){
                return -9001;
            }
        }
    } else if (!isCheck && CurrentMove>=30){
        var stalemate = checkmate(str);
        if (stalemate==="s"){
            return -9000;
        }
    }
    for (var scoring=0;scoring<scorePieces.length;scoring++){
        if (scorePieces[scoring]){
            var thisPiece = scorePieces[scoring];
            if (thisPiece.color===compColor){
                score += pieceScore(thisPiece.type);
                if (thisPiece.type==="N"){
                    score += KnightArr[scoring]/2;
                    compObj.N += 1;
                } else if (thisPiece.type==="B"){
                    score += bBishArr[scoring]/2;
                    compObj.B += 1;
                } else if (thisPiece.type==="R"){
                    score += bRookArr[scoring]/2;
                    compObj.R += 1;
                } else if (thisPiece.type==="Q"){
                    score += QueenArr[scoring]/2;
                } else if (thisPiece.type==="P"){
                    score += bPawnArr[scoring]/2;
                }
            } else if (thisPiece.color===playerColor){
                score -= pieceScore(thisPiece.type);
                if (thisPiece.type==="N"){
                    score += KnightArr[scoring]/2;
                    playerObj.N += 1;
                } else if (thisPiece.type==="B"){
                    score += wBishArr[scoring]/2;
                    playerObj.B += 1;
                } else if (thisPiece.type==="R"){
                    score += wRookArr[scoring]/2;
                    playerObj.R += 1;
                } else if (thisPiece.type==="Q"){
                    score += QueenArr[scoring]/2;
                } else if (thisPiece.type==="P"){
                    score += wPawnArr[scoring]/2;
                }
            }
        }
    }
    if (compObj.B>1){
        score += 1;
    }
    if (compObj.N>1){
        score += 0.5;
    }
    if (compObj.R>1){
        score += 1;
    }
    if (playerObj.N>1){
        score -= 0.5;
    }
    if (playerObj.B>1){
        score -= 1;
    }
    if (playerObj.R>1){
        score -= 1;
    }
    //console.log(score);
    return score;
}

function getAllMoves(str){
    var movesBoard = newBoard(str);
    var movesPieces = createPiecesArr(movesBoard);
    var allMoves = [];
    for (var movesc=0;movesc<movesPieces.length;movesc++){
        if (movesPieces[movesc]){
            var thisPiece = movesPieces[movesc];
            if (thisPiece.color===str[128]){
                thisPiece.moves = findMoves(movesc,thisPiece.type,thisPiece.color,str);
                for (var pushc=0;pushc<thisPiece.moves.length;pushc++){
                    allMoves.push(thisPiece.moves[pushc]);
                }
            }
        }
    }
    return allMoves;
}
var count=0;
function getBoardObjFromString(str,moveFunc){
    var boardObj = {
        string:str,
        color: str[128]
    }
    boardObj.movesArr = moveFunc(str);
    boardObj.moveStrings = [];
    boardObj.possibleNextBoards = [];
    boardObj.scores = [];
    //console.log(boardObj.movesArr);
    count++;
    if (boardObj.movesArr.length>0){
        for (var movestrings=0;movestrings<boardObj.movesArr.length;movestrings++){
            boardObj.moveStrings.push(swapBoardString(boardObj.string,boardObj.movesArr[movestrings][0],boardObj.movesArr[movestrings][1]));
        }
    }
    return boardObj;
}

function getFinalDepthMoveScores(board){
    board.scores.push(getScore(board.string));
}

function getWorstCase(board){
    var worstMove = 0;
    for(var worstcase=0;worstcase<board.possibleNextBoards.length;worstcase++){
        if (board.possibleNextBoards[worstcase].scores[0]<board.possibleNextBoards[worstMove].scores[0]){
            worstMove = worstcase;
        }
    }
    return worstMove;
}
function getBestCase(board){
    var bestMove = 0;
    for(var bestcase=0;bestcase<board.possibleNextBoards.length;bestcase++){
        if (board.possibleNextBoards[bestcase].scores[0]>board.possibleNextBoards[bestMove].scores[0]){
            bestMove = bestcase;
        }
    }
    return bestMove;
}
function getCompMove(str){
    console.time("CompMove");
    var board = getBoardObjFromString(str,getAllMoves);
    for (var nextboards=0;nextboards<board.movesArr.length;nextboards++){
        board.possibleNextBoards.push(getBoardObjFromString(board.moveStrings[nextboards],getAllMoves));
        for (var depth2=0;depth2<board.possibleNextBoards[nextboards].movesArr.length;depth2++){
            board.possibleNextBoards[nextboards].possibleNextBoards.push(getBoardObjFromString(board.possibleNextBoards[nextboards].moveStrings[depth2],function(){return[];}));
            getFinalDepthMoveScores(board.possibleNextBoards[nextboards].possibleNextBoards[depth2]);
        }
        board.possibleNextBoards[nextboards].worstMove = {
            index: getWorstCase(board.possibleNextBoards[nextboards]),
            move: board.possibleNextBoards[nextboards].possibleNextBoards[getWorstCase(board.possibleNextBoards[nextboards])]
        }
        board.possibleNextBoards[nextboards].scores.push(board.possibleNextBoards[nextboards].worstMove.move.scores[0]);
    }
    board.bestMove = {
        index: getBestCase(board),
        move: board.possibleNextBoards[getBestCase(board)]
    }
    board.scores.push(board.bestMove.move.scores[0]);
    console.log(board);
    //console.log(board.possibleNextBoards);
    console.timeEnd("CompMove");
    console.log(count);
    count = 0;
    Destination(board.movesArr[board.bestMove.index][0],board.movesArr[board.bestMove.index][1],str);
}

function getCompMoveQuick(str){
    console.time("QuickMove");
    var board = getBoardObjFromString(str,getAllMoves);
    for (var ab=0;ab<board.movesArr.length;ab++){
        board.possibleNextBoards.push(getBoardObjFromString(board.moveStrings[ab],getAllMoves));
        if (ab==0){
            for (var bc=0;bc<board.possibleNextBoards[0].movesArr.length;bc++){
                board.possibleNextBoards[0].possibleNextBoards.push(getBoardObjFromString(board.possibleNextBoards[0].moveStrings[bc],function(){return[];}));
                getFinalDepthMoveScores(board.possibleNextBoards[0].possibleNextBoards[bc]);
            }
            board.possibleNextBoards[0].worstMove = {
                index: getWorstCase(board.possibleNextBoards[0]),
                move: board.possibleNextBoards[0].possibleNextBoards[getWorstCase(board.possibleNextBoards[0])]
            }
            board.possibleNextBoards[0].scores.push(board.possibleNextBoards[0].worstMove.move.scores[0]);
        }
    }
    console.log("move 0 score= " + board.possibleNextBoards[0].scores[0]);

    for (var boardCount=1;boardCount<board.movesArr.length;boardCount++){
        board.possibleNextBoards.push(getBoardObjFromString(board.moveStrings[boardCount],getAllMoves));
        for (var ac=0;ac<board.possibleNextBoards[boardCount].movesArr.length;ac++){
            board.possibleNextBoards[boardCount].possibleNextBoards.push(getBoardObjFromString(board.possibleNextBoards[boardCount].moveStrings[ac],function(){return[];}));
            getFinalDepthMoveScores(board.possibleNextBoards[boardCount].possibleNextBoards[ac]);
            if (board.possibleNextBoards[boardCount].possibleNextBoards[ac].scores[0]<board.possibleNextBoards[0].scores[0]){
                ac = board.possibleNextBoards[boardCount].movesArr.length;
                board.possibleNextBoards[boardCount].scores[0] = -999;
            }
        }
        if (board.possibleNextBoards[boardCount].scores[0]!=-999){
            board.possibleNextBoards[boardCount].worstMove = {
                index: getWorstCase(board.possibleNextBoards[boardCount]),
                move: board.possibleNextBoards[boardCount].possibleNextBoards[getWorstCase(board.possibleNextBoards[boardCount])]
            }
            board.possibleNextBoards[0].scores.push(board.possibleNextBoards[boardCount].worstMove.move.scores[0]);
        }
    }
    board.bestMove = {
        index: getBestCase(board),
        move: board.possibleNextBoards[getBestCase(board)]
    }
    board.scores.push(board.bestMove.move.scores[0]);
    console.timeEnd("QuickMove");
    Destination(board.movesArr[board.bestMove.index][0],board.movesArr[board.bestMove.index][1],str);
}

}