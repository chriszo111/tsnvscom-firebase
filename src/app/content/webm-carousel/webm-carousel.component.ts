import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-webm-carousel',
  templateUrl: './webm-carousel.component.html',
  styleUrls: ['./webm-carousel.component.css']
})
export class WebmCarouselComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let video = document.getElementById("startVideo") as HTMLMediaElement;
    video.muted = true;
  }

}
