import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { trigger, transition, useAnimation } from '@angular/animations';
import { bounce, fadeIn } from 'ng-animate';
import { AppComponent } from 'src/app/app.component';
import { IFigures } from 'src/app/interfaces/home-figures';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeIn', [
      transition('* => *', useAnimation(fadeIn)),
    ])
  ],
  providers: [NgbCarouselConfig]
})
export class HomeComponent implements OnInit {

  figures: IFigures[] = [];
  dbFigures: AngularFirestoreCollection;
  fadeIn: any;
  public innerWidth: any;
  public innerHeight: any;

  constructor(private titleService: Title,
              private ngbCarouselConfig: NgbCarouselConfig,
              public appComponent: AppComponent,
              private db: AngularFirestore) {
                ngbCarouselConfig.showNavigationArrows = false;
                ngbCarouselConfig.interval = 15000;
              }

  ngOnInit() {
    this.titleService.setTitle('Home - Tensation Virtual Services - tsnvs.com');
    if (this.appComponent._opened) {
      this.appComponent._opened = false;
    }

    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;

    this.getFiguresFromDb()
      .then((res) => {
        res.docs.forEach((el) => {
          this.figures.push({
            img: {
              src: el.data().img.src ? el.data().img.src : `https://picsum.photos/${this.innerWidth}/${this.innerHeight}?image=${el.data().img.picsumId}`,
              alt: el.data().img.alt ? el.data().img.alt : null,
              picsumId: el.data().img.picsumId ? el.data().img.picsumId : null
            },
            icon: {
              name: el.data().icon.name ? el.data().icon.name : null,
              prefix: el.data().icon.prefix ? el.data().icon.prefix : null,
              size: el.data().icon.size ? el.data().icon.size : null
            },
            title: el.data().title,
            caption: el.data().caption,
            lastUpdate: new Date(el.data().lastUpdate)
          });
        });
      })
      .catch((err) => {
        console.log(err);
      })
  }

  async getFiguresFromDb(): Promise<any> {
    const figuresCollectionRef = await firebase.firestore().collection('figures');
    return figuresCollectionRef.get();
  }
}
