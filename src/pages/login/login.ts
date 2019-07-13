import { LoginProvider } from './../../providers/login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  formGroup: any;
  isCordova: boolean;
  callback: string;
  creds: firebase.User;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private fireBaseAuth: AngularFireAuth,
    private LoginProvider: LoginProvider,
    private platform: Platform
    ) {
      this.formGroup = new FormGroup({
        username: new FormControl('', [ Validators.required ]),
        password: new FormControl('', [ Validators.required ]),
      });
      this.isCordova = this.platform.is('cordova');

  }
  async login(){
    this.callback = await this.LoginProvider.signIn(this.formGroup.get('username').value, this.formGroup.get('password').value);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
