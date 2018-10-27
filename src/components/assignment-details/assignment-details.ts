import { Injectable ,Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ViewController, ModalController } from 'ionic-angular';
import { Assignment } from '../../classes/Assignment';
import { AssignmentsLibraryProvider } from '../../providers/assignments-library/assignments-library';
import { EditAssignmentComponent } from '../edit-assignment/edit-assignment';

@Component({
  selector: 'assignment-details',
  templateUrl: 'assignment-details.html'
})
@Injectable()
export class AssignmentDetailsComponent {
  detailsData: Assignment;
  details:any;
  datePattern = 'HH:mm:ss dd-MMM-yy';

  constructor(private viewController:ViewController, private modalController:ModalController, private datePipe: DatePipe, private assignmentsLibrary: AssignmentsLibraryProvider) {
    this.detailsData = this.viewController.data.Assignment;
    this.details = Object.keys(this.detailsData);

    if(this.detailsData["StartTime"]){
      this.detailsData["StartTime"] = this.dateToStringConversion(this.detailsData["StartTime"]);
    }
    if(this.detailsData["EndTime"]){
      this.detailsData["EndTime"] = this.dateToStringConversion(this.detailsData["EndTime"]);
    }
  }
  dateToStringConversion(date: any): string{
    return this.datePipe.transform(date, this.datePattern);
  }
  closeModal(){
  	this.viewController.dismiss();
  }
  removeAssignment(){
    this.assignmentsLibrary.removeAssignment(this.detailsData)
      .then((assignments: Assignment[])=>{
      	this.viewController.dismiss(assignments);     
      })
  }
  editAssignment(){
    let modal = this.modalController.create(EditAssignmentComponent, {Assignment: this.detailsData});
    modal.onDidDismiss((assignmentData: Assignment) => {
      if(assignmentData){
        this.assignmentsLibrary.modifyAssignment(assignmentData)
        .then((success) => {
          console.log("success in stored changed value");
          this.detailsData = assignmentData;
        });
      }
    })
    modal.present();    
  }

}
