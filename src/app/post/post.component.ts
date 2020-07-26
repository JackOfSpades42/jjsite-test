import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {

  @Input() title: string;
  @Input() intro: string;
  @Input() para1: string;
  @Input() para2: string;
  @Input() para3: string;
  @Input() date: string;

  constructor() {}

  NgOnInit (){

  }
}