import { LoginProvider } from './../../providers/login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, App, ViewController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Pages } from '../../enums/pages';

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
  pageName = Pages.Login;
  formGroup: any;
  isCordova: boolean;
  creds: firebase.User;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private LoginProvider: LoginProvider,
    private platform: Platform,
    private viewController: ViewController
    ) {
      this.formGroup = new FormGroup({
        username: new FormControl('', [ Validators.required ]),
        password: new FormControl('', [ Validators.required ]),
      });
      this.isCordova = this.platform.is('cordova');

  }

  closeModal(){
    this.viewController.dismiss();
  }
  
  async login(){
    this.LoginProvider.signIn(this.formGroup.get('username').value, this.formGroup.get('password').value)
    .then( ()=>{
      this.viewController.dismiss();
    })
    .catch( (err)=>{
      console.log(err);
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
