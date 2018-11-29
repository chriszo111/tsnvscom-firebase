import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  copyrightVideos: boolean = true;
  bgVideo_ref: AngularFireStorageReference;
  bgVideo: Observable<any>;

  constructor(private titleService: Title,
              private afs: AngularFireStorage) {
                this.bgVideo = afs.ref('media/mp4/about-example-video.mp4').getDownloadURL();
               }

  ngOnInit() {
    this.titleService.setTitle("About - Tensation Virtual Services - tsnvs.com");

    // Mute the start screen video
    let element = document.getElementById("aboutVideo") as HTMLMediaElement;
    element.muted = true;
  }

  title = 'About Us';
}
