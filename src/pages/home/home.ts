import { Platform } from 'ionic-angular/platform/platform';
import { Pages } from './../../enums/pages';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pageName = Pages.Home;
  isCordova: boolean;
  callback: string;
  platform: any;
  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public platformProvider: Platform
    ) {
      this.platform = this.platformProvider.platforms();
  }


}

