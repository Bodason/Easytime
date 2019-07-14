import { Subscription } from 'rxjs/Subscription';
import { User } from './../../providers/login/user';
import { LoginPage } from './../../pages/login/login';
import { NavController, App, AlertController, ModalController } from 'ionic-angular';
import { LoginProvider } from './../../providers/login/login';
import { Component, Input } from '@angular/core';

/**
 * Generated class for the EztNavbarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'ezt-navbar',
  templateUrl: 'ezt-navbar.html'
})
export class EztNavbarComponent {
  @Input() name: string;
  text: string;
  hasUser: User;
  watcher: Subscription;

  constructor( 
    private loginProvider: LoginProvider,
    private alertCtrl: AlertController,
    public modalController: ModalController ,
    ) {
      this.watcher = this.loginProvider.watchUser().subscribe( (user: User) => {
        this.hasUser = user;
      });

    }


  ionViewDidLeave(){
   this.watcher.unsubscribe();
   console.log('unsubscriberd');
  }

  async promtSignOut(){
    const alert =  this.alertCtrl.create({
      buttons: [
        { text:'No', role: 'cancel'},
        { text:'Yes', handler: ()=> { this.loginProvider.signOut() } }
      ],
      title: 'Sign out',
      subTitle: 'Do you want to sign out?'
    });
    await alert.present();
  }
  promtSignIn(){
    const loginModal = this.modalController.create(LoginPage);
    loginModal.present();
  }
}
