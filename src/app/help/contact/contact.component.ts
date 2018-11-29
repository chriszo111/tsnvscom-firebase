import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireFunctionsModule } from '@angular/fire/functions'
import { AngularFirestoreModule } from '@angular/fire/firestore';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  particleStyle: object = {};
	particleParams: object = {};
	particleWidth: number = 100;
  particleHeight: number = 100;

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle("Contact - Tensation Virtual Services - tsnvs.com");

    this.particleStyle = {
      'background-color': 'transparent',
      'opacity': '0.4',
      'box-shadow': 'inset 0px 0px 10px rgba(0,0,0,0.7)',
      'position': 'fixed',
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
  }

}
