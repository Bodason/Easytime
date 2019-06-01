import { Component, Injectable } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { Assignment } from '../../classes/Assignment';
import { AssignmentsLibraryProvider } from '../../providers/assignments-library/assignments-library';
import { ToastController } from 'ionic-angular';

import { AssignmentDetailsComponent } from '../../components/assignment-details/assignment-details';
import { AddAssignmentComponent } from '../../components/add-assignment/add-assignment';
import { Subscription } from 'rxjs/Subscription';
import { TimerProvider } from '../../providers/timer/timer';

@Component({
  selector: 'page-assignments',
  templateUrl: 'assignments.html',
})
@Injectable()
export class AssignmentsPage {
  assignments: Array<Assignment>;
  assignmentSubscription: Subscription;
  
  constructor(	
          public navCtrl: NavController,
          public modalController: ModalController ,
  				public navParams: NavParams, 
          public toastr: ToastController,
          private assignmentsLibrary: AssignmentsLibraryProvider,
          private timer: TimerProvider  
          ) { 
            this.getAssignments();
          }

  async getAssignments(): Promise<Assignment[]>{
    return await this.assignmentsLibrary.Assignments; 
  }

  ionViewWillUnload(){
    if(this.assignmentSubscription){
      this.assignmentSubscription.unsubscribe();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AssignmentsPage');
    this.assignmentSubscription = this.assignmentsLibrary.subscribeToAssignments()
      .subscribe((data: Assignment[]) => {
        this.assignments = data;
      })
  }

  getDetails(assignment: Assignment){
    let modal = this.modalController.create(AssignmentDetailsComponent, {Assignment: assignment});
    modal.onDidDismiss((assignments: Assignment[]) => {})
    modal.present();
  }

  addAssignment(){
    let modal = this.modalController.create(AddAssignmentComponent);
    modal.onDidDismiss((assignment: Assignment) => {});
    modal.present();
  }

  async startTimer(index: number){
    let timerObject = await this.timer.startTimer(this.assignments[index])
    timerObject.timeSubject.subscribe( (data) => {
      this.assignments[index].timeElapsed = data;
    });
 }

  stopTimer(assignment: Assignment, i){
    this.timer.stopTimer(assignment);
  }

  toHHMMSS(seconds: any): any {
    var date = new Date(null);
    date.setSeconds(seconds); // specify value for SECONDS here
    var timeString = date.toISOString().substr(11, 8);
    return timeString;
  }
}


