import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireFunctionsModule } from '@angular/fire/functions';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';
import { faGlobe, faGamepad, faServer, faHeadset, faArrowDown, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faTwitch, faTeamspeak, faSteam, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { TimeAgoPipe } from 'time-ago-pipe';

import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { AboutComponent } from './content/about/about.component';
import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';
import { HomeComponent } from './content/home/home.component';
import { ContactComponent } from './help/contact/contact.component';
import { ChatComponent } from './help/chat/chat.component';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';

// Add all regular icons to library
library.add(faCommentAlt);
// Add all solid icons to library
library.add(faGlobe, faGamepad, faServer, faHeadset, faArrowDown, faExternalLinkAlt, faCommentAlt);
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
    ContactComponent,
    TimeAgoPipe,
    ChatComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase, 'rebuilt-games'),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    FontAwesomeModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [Title, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
