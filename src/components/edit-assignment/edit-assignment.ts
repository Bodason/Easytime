import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component } from '@angular/core';

import { ViewController } from 'ionic-angular';
import { AssignmentsLibraryProvider } from '../../providers/assignments-library/assignments-library';
import { Assignment } from '../../classes/Assignment';
import { Guid } from '../../classes/guid';

/**
 * Generated class for the EditAssignmentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'edit-assignment',
  templateUrl: 'edit-assignment.html'
})
export class EditAssignmentComponent {
  assignmentData: Assignment;
  formGroup: FormGroup;
  text: string;

  constructor(private viewController: ViewController, private assignmentsLibrary: AssignmentsLibraryProvider) {
    this.assignmentData = this.viewController.data.Assignment;
    this.formGroup = new FormGroup({
  		Name: new FormControl(this.assignmentData.Name,[Validators.required]),
      Description : new FormControl(this.assignmentData.Description,[Validators.required]),
      //InProgress: new FormControl('false', [Validators.required]),
      timeElapsed: new FormControl(this.assignmentData.timeElapsed, [Validators.required, Validators.min(0)])
    });
  }
  closeModal(){
  	this.viewController.dismiss();
  }
  saveChanges(){
    let changedAssignmentData: Assignment = new Assignment();
    changedAssignmentData.Id = this.assignmentData.Id;
    changedAssignmentData.InProgress = this.assignmentData.InProgress;
    changedAssignmentData.timeElapsed = parseFloat(this.formGroup.get("timeElapsed").value);
    changedAssignmentData.Name = this.formGroup.get("Name").value;
    changedAssignmentData.Description = this.formGroup.get("Description").value;
  	this.viewController.dismiss(changedAssignmentData);
  }
  

}
