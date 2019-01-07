import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { SecureAuthPagesGuard } from './guards/secure-auth-pages.guard';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireFunctionsModule } from '@angular/fire/functions';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';
import { faTimes, faGlobe, faGamepad, faServer, faHeadset, faArrowDown, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faTwitch, faTeamspeak, faSteam, faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';
import { TimeAgoPipe } from 'time-ago-pipe';

import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { AboutComponent } from './content/about/about.component';
import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';
import { HomeComponent } from './content/home/home.component';
import { ContactComponent } from './help/contact/contact.component';
import { ChatComponent } from './help/chat/chat.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { SignInComponent } from './views/sign-in/sign-in.component';
import { SignUpComponent } from './views/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './views/verify-email/verify-email.component';
import { LoginComponent } from './views/login/login.component';

// Add all regular icons to library
library.add(faCommentAlt);
// Add all solid icons to library
library.add(faGlobe, faGamepad, faServer, faHeadset, faArrowDown, faExternalLinkAlt, faCommentAlt, faTimes);
// Add all brand icons to library
library.add(faFacebook, faTeamspeak, faTwitch, faTwitter, faSteam, faGithub);

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
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    FontAwesomeModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [Title, AuthService, AuthGuard, SecureAuthPagesGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
