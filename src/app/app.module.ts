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
    HttpClientModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
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
