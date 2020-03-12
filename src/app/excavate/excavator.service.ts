import { Injectable } from '@angular/core';

@Injectable()
export class ExcavatorService {
  songs;
  YP;
  P1;
  P2;
  P3;
  P4;
  P5;
  P6;
  playlistArray;
  oddsArray;
  divisor;
  constructor() { 
    this.songs = ["Twist Me to The Left","Creeps Me Out","Shook Me All Night Long","Keasby Nights","Dude Looks Like a Lady","Liftoff","Rock and Roll Band","99 Red Balloons","Don't Fear the Reaper","Watch it Crash","Somewhere in the Between","Here's to Life","Alway Look On the Bright Side of Life","Trendy","Sellout","Nobody but Me","Holy Diver","Beer","Five Finger Discount","Poker Face","Shake it Off","Fashion Zombies","Bigger Than Punk Rock","The Metal","Do it Today","Floating Away","Ruby Soho","Shout at the Devil","The Number of the Beast","Wild Side","Girls, Girls, Girls","All the Nights","Love Fair","Road Rash","Monkeys","Weird Beard","Last Breath","Lay Your Head Down","Spiderwebs","Don't Speak","Hella Good","Hey Baby","Flathead","My Friend John","Mexican Radio","Second Solution","Fight Dirty","Live Wire","Superman"];
    this.YP = [];
    this.P1 = [];
    this.P2 = [];
    this.P3 =[];
    this.P4 = [];
    this.P5 = [];
    this.P6 = [];
    this.playlistArray = [this.YP,this.P1,this.P2,this.P3,this.P4,this.P5,this.P6];
    this.oddsArray =[];
    this.divisor = 0;
  }

  initialize(){
    for (let a=0;a<7;a++){
      let currentPlaylist = this.playlistArray[a];
      let table = document.createElement("table");
      table.border = "1px solid black";
      table.style.fontFamily = "Georgia";
      table.style.background = "white";
      if (a==0){
        let header = document.createElement("th");
        header.colSpan=2;
        header.innerHTML = "Your Playlist";
        table.appendChild(header);
      } else {
        let header = document.createElement("th");
        header.innerHTML = "Playlist " + a.toString();
        header.colSpan=2;
        table.appendChild(header);
      }
      let usedSongs:number[] = [];
      for (let b=0;b<10;b++){
        let songRow = document.createElement("tr");
        songRow.style.border = "1px solid black";
        let numberSpot = document.createElement("td");
        numberSpot.innerHTML= (b+1).toString() + ".";
        let rand = Math.floor(Math.random() * this.songs.length);
        while (usedSongs.indexOf(rand)!==-1){
          rand = Math.floor(Math.random() * this.songs.length);
        }
        //console.log(rand);
        usedSongs.push(rand);
        currentPlaylist.push(rand);
        let songSpot = document.createElement("td");
        songSpot.id = "P" + a.toString() + "S" + (b+1).toString();
        if (a!=0){
          let clickWrap = document.createElement("a");
          clickWrap.addEventListener("click",function(){this.select(("P" + a.toString() + "S" + (b+1).toString()))}.bind(this));
          clickWrap.innerHTML = this.songs[rand];
          clickWrap.style.cursor = "pointer";
          songSpot.appendChild(clickWrap);
        } else {
          let clickWrap = document.createElement("a");
          clickWrap.innerHTML = this.songs[rand];
          songSpot.appendChild(clickWrap);
        }
        songRow.appendChild(numberSpot);
        songRow.appendChild(songSpot);
        table.appendChild(songRow);
        if (a==0){
        let output = document.getElementById("output");
        output.appendChild(table);
        } else if (a>0 && a<4){
          let rowOne = document.getElementById("rowOne");
          rowOne.appendChild(table);
        } else if (a>=4){
          let rowTwo = document.getElementById("rowTwo");
          rowTwo.appendChild(table);
        }
      }
    }
    for (let g=0;g<this.songs.length;g++){
      this.oddsArray.push(0);
    }
    for (let h=0;h<10;h++){
      for (let i=1;i<7;i++){
        if (this.YP.indexOf(this.playlistArray[i][h])>=0){
          for (let k=0;k<10;k++){
            if (this.YP.indexOf(this.playlistArray[i][k])<0){
              this.oddsArray[this.playlistArray[i][k]]++;
              this.divisor++;
            }
          }
        }
      }
    }
    for (let m=0;m<this.songs.length;m++){
      this.oddsArray[m] *= 100;
      this.oddsArray[m] /= this.divisor;
      this.oddsArray[m] = this.oddsArray[m].toFixed(2);
    }
    console.log(this.oddsArray);
    let goButton = document.getElementById("go");
    goButton.addEventListener("click",function(){this.goFunction()}.bind(this))
  }
  select(str:string) {
    let selection = document.getElementById(str);
    let nameBegin = selection.innerHTML.indexOf(">")+1;
    let nameEnd = selection.innerHTML.indexOf("</");
    let songName = selection.innerHTML.substring(nameBegin,nameEnd);
    let songNumber = this.songs.indexOf(songName);
    let allPlaylists = this.allSongNames(songName,songNumber);
    if (this.YP.indexOf(songNumber)==-1){
      this.matchToYP(allPlaylists);
    }
    selection.style.background = "red";
    console.log(songNumber);
    let exBox = document.getElementById("explanation");
    if (this.YP.indexOf(songNumber)<0){
      let compare = this.compareLists(allPlaylists);
      exBox.innerHTML = "The song <b>" + songName + "</b> has a <br><h3>" + this.oddsArray[songNumber] + "%</h3><br> chance of being picked due to it being present in <b>" + allPlaylists.length + "</b> playlists. ";
      if (compare==allPlaylists.length){
        exBox.innerHTML += "<b>All</b>";
      } else {
        exBox.innerHTML += "<b>" + compare +"</b>";
      }
       exBox.innerHTML += " of which contain songs in the original playlist."; 
    } else {
      exBox.innerHTML = "The song <b>" + songName + "</b> has a <br><h3>0.00%</h3><br> chance of being picked due to it being one of the original songs in 'your' playlist.";
    }
  }


  allSongNames(songName:string,songNumber:number):number[]{
    let playlists = [];
    for (let c=1;c<7;c++){
      for (let d=0;d<10;d++){
        let currentSong =  document.getElementById("P" + c.toString() + "S" + (d+1).toString());
        currentSong.style.background = "white";
       if(this.playlistArray[c][d] == songNumber){
        currentSong.style.background = "teal";
        playlists.push(c);
       }
      }
    }
    return playlists;
  }

  matchToYP(all:number[]){
    for (let e=0;e<all.length;e++){
      for (let f=0;f<10;f++){
        let inList =this.playlistArray[all[e]].indexOf(this.YP[f])+1;
        if (inList>0){
          //console.log("P" + all[e].toString() + "S" + inList.toString());
          let sameSong = document.getElementById("P" + all[e].toString() + "S" + inList.toString());
          sameSong.style.background = "purple";
        }
      }
    }
  }

  compareLists(all:number[]):number{
    let compare = 0;
    for (let n=0;n<all.length;n++){
      if (this.matchSongs(this.playlistArray[all[n]])){
        compare++;
      }
    }
    return compare;
  }

  matchSongs(playlist){
    for (let o=0;o<10;o++){
      for (let p=0;p<10;p++){
        if (playlist[o]==this.YP[p]){
          return true;
        }
      }
    }
    return false;
  }
  goFunction(){
    let firstRand = Math.floor(Math.random() * 10);
    let firstRandSong = this.YP[firstRand];
    let playlistsContainingSong = this.allSongNames(this.songs[firstRandSong],firstRandSong);
    while (playlistsContainingSong.length==0){
      firstRand = Math.floor(Math.random() * 10);
      firstRandSong = this.YP[firstRand];
      playlistsContainingSong = this.allSongNames(this.songs[firstRandSong],firstRandSong);
    }
    let randPlaylistNum = playlistsContainingSong[Math.floor(Math.random() * playlistsContainingSong.length)];
    let randPlaylist = this.playlistArray[randPlaylistNum];
    let finalRandSong = randPlaylist[Math.floor(Math.random() * 10)];
    while (this.YP.indexOf(finalRandSong)>=0){
      finalRandSong = randPlaylist[Math.floor(Math.random() *10)];
      //console.log("Rerolling song # to " + finalRandSong);
    }
    let finalSongNumInPL = randPlaylist.indexOf(finalRandSong) + 1;
    let finalSongName = this.songs[finalRandSong];
    //console.log(finalSongName + " #" + finalRandSong);
    let exBox = document.getElementById("explanation");
    exBox.innerHTML = "The song chosen was <h3>" + finalSongName + "</h3> Chosen from playlist #" + randPlaylistNum + "<br>By taking the song <b>" + this.songs[firstRandSong] + "</b> in the original playlist.";
    let finalSongBox = document.getElementById("P" + randPlaylistNum.toString() + "S" + finalSongNumInPL.toString());
    //console.log("P" + randPlaylistNum.toString() + "S" + finalSongNumInPL.toString());
    finalSongBox.style.background = "purple";
  }
}