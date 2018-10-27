import { Component, Injectable } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { Assignment } from '../../classes/Assignment';
import { AssignmentsLibraryProvider } from '../../providers/assignments-library/assignments-library';
import { ToastController } from 'ionic-angular';

import { AssignmentDetailsComponent } from '../../components/assignment-details/assignment-details';
import { AddAssignmentComponent } from '../../components/add-assignment/add-assignment';
import { Subscription } from 'rxjs/Subscription';
import { TimerProvider, TimerObject } from '../../providers/timer/timer';

@Component({
  selector: 'page-assignments',
  templateUrl: 'assignments.html',
})
@Injectable()
export class AssignmentsPage {
  assignments: Array<Assignment>;
  errorMsg: any;
  hello: any;
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

  getAssignments(){
    this.assignmentsLibrary.Assignments
      .then((data:Assignment[]) => { console.log("success fetching assignments from storage") })
      .catch((err) => {
        let toast = this.toastr.create({
                  message:("source="+err.source+", code="+err.code+", exception: "+err.exception),
                  position:'bottom',
                  showCloseButton:true,
                })
      toast.present();
    }) 
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
  startTimer(i: number){
    this.assignmentsLibrary.startTimer(this.assignments[i])
      .then( (data ) => { 
        this.assignments[i] = data[i]
      
      })
    this.timer.startTimer(this.assignments[i]);
    this.timer.getTime(this.assignments[i]).subscribe((data: number) => {
      this.assignments[i].timeElapsed = data;
    });
  }
  stopTimer(assignment: Assignment, i){
    this.assignmentsLibrary.stopTimer(assignment);
    this.timer.stopTimer(assignment);
  
  }

  toHHMMSS(seconds: any): any {
    var date = new Date(null);
    date.setSeconds(seconds); // specify value for SECONDS here
    var timeString = date.toISOString().substr(11, 8);
    return timeString;
  }
}


