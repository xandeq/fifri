import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SignupPage } from './signup/signup.page';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { AngularFireModule, FirebaseAppConfig } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from 'angularfire2/firestore';
import { HTTP } from '@ionic-native/http/ngx';

import * as firebase from 'firebase';
import { LoginPage } from './login/login.page';

firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [AppComponent, SignupPage, LoginPage],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), FormsModule, AppRoutingModule, 
    AngularFireModule.initializeApp(environment.firebase), ReactiveFormsModule, 
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule],
  providers: [
    StatusBar, 
    FormBuilder, 
    UserService,
    SplashScreen,
    HTTP,
    AngularFirestore,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
