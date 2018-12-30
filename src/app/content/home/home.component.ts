import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TimeAgoPipe } from 'time-ago-pipe';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbCarouselConfig]
})
export class HomeComponent implements OnInit {

  figures: any = [];
  public innerWidth: any;
  public innerHeight: any;

  constructor(private titleService: Title,
              private ngbCarouselConfig: NgbCarouselConfig) { 
                ngbCarouselConfig.showNavigationArrows = false;
                ngbCarouselConfig.interval = 15000;
              }

  ngOnInit() {
    this.titleService.setTitle('Home - Tensation Virtual Services - tsnvs.com');
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    this.createFigures();
  }

  createFigures() {
    this.figures.push({
      img: {
        src: 'https://picsum.photos/' + this.innerWidth + '/' + this.innerHeight + '?image=777',
        alt: 'Teamspeak, Ventrilo? No problem for us!'
      },
      icon: {
        name: 'headset',
        prefix: 'fas',
        size: 'lg'
      },
      title: 'Free Voice!',
      caption: 'Feel free to apply for a premium voice server. We use highest bandwidth for minumum delay!',
      lastUpdate: '2018-10-18 15:20'
    });

    this.figures.push({
      img: {
        src: 'https://picsum.photos/' + this.innerWidth + '/' + this.innerHeight + '?image=904',
        alt: 'We offer you a range of quality gaming servers. Fun or Training? You decide!'
      },
      icon: {
        name: 'gamepad',
        prefix: 'fas',
        size: 'lg'
      },
      title: 'Free Gaming!',
      caption: 'Feel free to apply for a premium gaming server. We use highest bandwidth and hardware for minumum delays!',
      lastUpdate: '2018-10-18 14:10'
    });

    this.figures.push({
      img: {
        src: 'https://picsum.photos/' + this.innerWidth + '/' + this.innerHeight + '?image=1078',
        alt: 'High-quality web servers with minimum response time, modern technologies and maximum success!'
      },
      icon: {
        name: 'server',
        prefix: 'fas',
        size: 'lg'
      },
      title: 'Free Hosting!',
      caption: 'Feel free to apply for a premium gaming server. We use highest bandwidth and hardware for minumum delays!',
      lastUpdate: '2018-10-18 12:20'
    });

    console.log(this.figures);
  }
}
