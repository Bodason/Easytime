import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { Platform } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  isCordova: boolean;
  callback: string;

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 

    ) {

  }


}

