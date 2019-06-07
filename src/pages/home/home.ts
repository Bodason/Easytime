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
    private fireBaseAuth: AngularFireAuth,
    private platform: Platform
    ) {
      this.formGroup = new FormGroup({
        username: new FormControl('', [ Validators.required ]),
        password: new FormControl('', [ Validators.required ]),
      });
      this.isCordova = this.platform.is('cordova');


    /*
    
    this.fireBaseAuth.createUserWithEmailAndPassword('test@gmail.com', '123')
    .then((res: any) => console.log(res))
    .catch((error: any) => console.error(error));
    */

  }

  send(){
    this.fireBaseAuth.auth.signInWithEmailAndPassword(this.formGroup.get('username').value, this.formGroup.get('password').value)
    .then( (creds:firebase.auth.UserCredential) => {
      this.callback = 'Success authenticating';
    })
    .catch( (err:firebase.auth.Error) => {
      this.callback = 'error authenticating';

    })
  }
}

