import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  img;
  img2;
  constructor() { }

  ngOnInit() {
    this.img2 = new Image;
    this.img2.src = "assets/img/20200730_190312.jpg";
    this.img2.class = "portrait";
    document.body.append(this.img2);
    this.img = "/assets/img/20200730_190312.jpg";
  }

}