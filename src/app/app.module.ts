import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireFunctionsModule } from '@angular/fire/functions'

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGamepad, faServer, faHeadset, faArrowDown, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faTwitch, faTeamspeak, faSteam, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { ParticlesModule } from 'angular-particle';
import { TimeAgoPipe } from 'time-ago-pipe'

import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { AboutComponent } from './content/about/about.component';
import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';
import { HomeComponent } from './content/home/home.component';
import { WebmCarouselComponent } from './content/webm-carousel/webm-carousel.component';
import { ContactComponent } from './help/contact/contact.component';

// Add all solid icons to library
library.add(faGamepad, faServer, faHeadset, faArrowDown, faExternalLinkAlt);
// Add all brand icons to library
library.add(faFacebook, faTeamspeak, faTwitch, faTwitter, faSteam);

@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    AppFooterComponent,
    AboutComponent,
    PageNotFoundComponent,
    HomeComponent,
    WebmCarouselComponent,
    ContactComponent,
    TimeAgoPipe
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'rebuilt-games'),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    FontAwesomeModule,
    AppRoutingModule,
    ParticlesModule
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
