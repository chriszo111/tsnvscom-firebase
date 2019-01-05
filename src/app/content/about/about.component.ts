import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { UrlSerializer, Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  copyrightVideos: Boolean = true;
  bgVideoRef: any;
  bgVideo$: Observable<any>;

  constructor(private titleService: Title,
              private afs: AngularFireStorage,
              private router: Router) { }

  async ngOnInit() {
    this.titleService.setTitle('About - Tensation Virtual Services - tsnvs.com');

    this.bgVideo$ = await this.afs.ref('media/mp4').child('about-example-video.mp4').getDownloadURL().subscribe();

    // Mute the start screen video
    const element = document.getElementById('aboutVideo') as HTMLMediaElement;
    element.muted = true;
  }
}
