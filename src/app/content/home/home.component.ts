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

  particleStyle: object = {};
	particleParams: object = {};
	particleWidth: number = 100;
  particleHeight: number = 100;
  figures: any = [];

  constructor(private titleService: Title,
              private ngbCarouselConfig: NgbCarouselConfig) { 
                ngbCarouselConfig.showNavigationArrows = false;
                ngbCarouselConfig.interval = 15000;
              }

  ngOnInit() {
    this.titleService.setTitle("Home - Tensation Virtual Services - tsnvs.com");
    
    this.particleStyle = {
      'background-color': 'transparent',
      'opacity': '0.4',
      'box-shadow': 'inset 0px 0px 10px rgba(0,0,0,0.7)',
      'position': 'fixed',
      'z-index': '1000',
      'margin-top': '0em',
      'width': '100%',
      'height': '100%',
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0,
    };

    this.particleParams = {
      particles: {
        number: {
          value: 80,
          density: {
            enabled: true,
            value_area: 800
          }
        },
        color: {
          value: "#ffffff"
        },
        shape: {
          type: "edge",
          stroke: {
            width: 0,
            color: "#000000"
          },
          polygon: {
            nb_sides: 4
          }
        },
        opacity: {
          value: 1,
          random: true,
          anim: {
            enable: true,
            speed: 0.2,
            opacity_min: 0.1,
            sync: false
          }
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: "window",
        events: {
          onhover: {
            enable: true,
            mode: "grab"
          },
          onclick: {
            enable: false,
            mode: "push"
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 227.77222777222775,
            line_linked: {
              opacity: 0.5747545150609971
            }
          }
        }
      },
      retina_detect: true
    };

    this.createFigures();
  }

  createFigures() {
    this.figures.push({
      img: {
        src: "https://picsum.photos/1920/1080?image=777",
        alt: "Teamspeak, Ventrilo? No problem for us!"
      },
      icon: {
        name: "headset",
        prefix: "fas",
        size: "lg"
      },
      title: "Free Voice!",
      caption: "Feel free to apply for a premium voice server. We use highest bandwidth for minumum delay!",
      lastUpdate: "2018-10-18 15:20"
    });

    this.figures.push({
      img: {
        src: "https://picsum.photos/1920/1080?image=904",
        alt: "We offer you a range of quality gaming servers. Fun or Training? You decide!"
      },
      icon: {
        name: "gamepad",
        prefix: "fas",
        size: "lg"
      },
      title: "Free Gaming!",
      caption: "Feel free to apply for a premium gaming server. We use highest bandwidth and hardware for minumum delays!",
      lastUpdate: "2018-10-18 14:10"
    });

    this.figures.push({
      img: {
        src: "https://picsum.photos/1920/1080?image=1078",
        alt: "High-quality web servers with minimum response time, modern technologies and maximum success!"
      },
      icon: {
        name: "server",
        prefix: "fas",
        size: "lg"
      },
      title: "Free Hosting!",
      caption: "Feel free to apply for a premium gaming server. We use highest bandwidth and hardware for minumum delays!",
      lastUpdate: "2018-10-18 12:20"
    });

    console.log(this.figures);
  }
}
