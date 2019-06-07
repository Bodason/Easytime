import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { NativeStorage } from '@ionic-native/native-storage';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AssignmentsPage } from '../pages/assignments/assignments';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AssignmentsLibraryProvider } from '../providers/assignments-library/assignments-library';

import { AssignmentDetailsComponent } from '../components/assignment-details/assignment-details';
import { AddAssignmentComponent } from '../components/add-assignment/add-assignment';
import { EditAssignmentComponent } from '../components/edit-assignment/edit-assignment';
import { TimerProvider } from '../providers/timer/timer';
import { StatisticsPage } from '../pages/statistics/statistics';

import { PlotlyModule } from 'angular-plotly.js';

import { AngularFireModule } from '@angular/fire';
// import { AngularFirestoreModule } from '@angular/fire/firestore';
// import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

// 2. Add your credentials from step 1
const config = {
  apiKey: "AIzaSyCE6jKrfzT08Z46dTu4CTo_qMlp-se1klw",
  authDomain: "easytimefcm.firebaseapp.com",
  databaseURL: "https://easytimefcm.firebaseio.com",
  projectId: "easytimefcm",
  storageBucket: "easytimefcm.appspot.com",
  messagingSenderId: "306218046889",
  appId: "1:306218046889:web:ddc03ab7a08108f4"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AssignmentsPage,
    StatisticsPage,
    AssignmentDetailsComponent,
    AddAssignmentComponent,
    EditAssignmentComponent
  ],
  imports: [
    BrowserModule,
    PlotlyModule,
    HttpClientModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AssignmentsPage,
    StatisticsPage,
    AssignmentDetailsComponent,
    AddAssignmentComponent,
    EditAssignmentComponent
  ],
  providers: [
    NativeStorage,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpClient,
    AssignmentsLibraryProvider,
    DatePipe,
    TimerProvider
  ]
})
export class AppModule {}
