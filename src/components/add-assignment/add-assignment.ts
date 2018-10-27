import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { AssignmentsLibraryProvider } from '../../providers/assignments-library/assignments-library';
import { Assignment } from '../../classes/Assignment';
import { Guid } from '../../classes/guid';

/**
 * Generated class for the AddAssignmentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'add-assignment',
  templateUrl: 'add-assignment.html'
})
export class AddAssignmentComponent {
  formGroup: FormGroup;
  text: string;

  constructor(private viewController: ViewController, private assignmentsLibrary: AssignmentsLibraryProvider) {
  	this.formGroup = new FormGroup({
  		Name: new FormControl('',[Validators.required]),
      Description : new FormControl('',[Validators.required]),
  	});
  }
  closeModal(){
  	this.viewController.dismiss();
  }
  createAssignment(){
  	let createdAssignment: Assignment = {
      Id: Guid.newGuid(),
      InProgress: false,
      timeElapsed: 0,
      Name:this.formGroup.get('Name').value, 
  		Description:this.formGroup.get('Description').value, 
    }
    this.assignmentsLibrary.addAssigment(createdAssignment)
      .then(()=>{
        this.viewController.dismiss(createdAssignment);
      }).catch((error)=> console.log("Error occured while trying to add assignment", error))
  }


}
