import { ToastController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import firebase from 'firebase/app';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs';


/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

  private user: User;
  public userSubject: BehaviorSubject<User> = new BehaviorSubject(this.user);

  constructor(
    public http: HttpClient,
    public fireBaseAuth: AngularFireAuth,
    private toastr:ToastController
    ) {
  }

  public setUser(user: User) {
    this.user = user;
    this.userSubject.next(user);
    console.log(user);
  }

  public getUser(): User{
    return this.user;
  }

  public watchUser(): BehaviorSubject<User>{
    return this.userSubject;
  }

  public signIn(userName: string, password: string): Promise<string>{
    return this.fireBaseAuth.auth.signInWithEmailAndPassword(userName, password)
    .then( async (creds:firebase.auth.UserCredential) => {
      const token = await creds.user.getIdToken();
      this.setUser({ UserName: creds.user.email, Token: token });
      await this.fireBaseAuth.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      const toast = this.toastr.create({
        message: 'Sucessfully logged in as ' + creds.user.email,
        duration: 2000,
        cssClass:'{background-color: green}'
      });
      toast.present();
      return 'Success authenticating';
    })
    .catch( (err:firebase.auth.Error) => {
      const toast = this.toastr.create({
        message: 'Login attempt failed',
        duration: 2000,
        cssClass:'{background-color: red}'
      });
      toast.present();
      throw new Error('Error authenticating');
    })
  }

  public async signOut() {
    await this.fireBaseAuth.auth.signOut();
    this.setUser(null);
  };

}
