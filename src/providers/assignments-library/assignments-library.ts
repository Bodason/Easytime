import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';
import { Platform } from 'ionic-angular/platform/platform';
import { Storage } from '@ionic/storage';

import { Assignment } from '../../classes/Assignment';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';

/*
  Generated class for the AssignmentsLibraryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AssignmentsLibraryProvider {
	assignments: Assignment[] = []; 
	
	constructor(
		public platform:Platform, 
		public http: HttpClient, 
		public storage:Storage
		) {
  }
  subject = new Subject();

  public get Assignments(): Promise<any>{
		  return this.storage.get('Assignments-library')
		  	.then((assignments: Assignment[]) => {
				this.subject.next(assignments);
				return assignments;
			})
  } 

  public getAssignment(id:string): Promise<Assignment>{
	return this.Assignments
	  	.then( (assignments: Assignment[]) => {
			let assignmentToReturn = new Assignment();
			assignments.forEach( (assignment: Assignment) => {
				if(assignment.Id === id){
					assignmentToReturn = assignment;		
				}
			});
			return assignmentToReturn;
		  });
  }

  public addAssigment(assignment: Assignment): Promise<any>{
		return this.storage.get('Assignments-library')
			.then((assignments: Assignment[]) => {
				if(!assignments){
					assignments =[];
				}
				assignments.push(assignment);
				this.assignments = assignments;	
				return assignments;
			})
			.then((assignments: Assignment[])=>{
				this.subject.next(assignments);
				return this.storage.set('Assignments-library',assignments);
			})
		
	}
	public removeAssignment(assignment: Assignment): Promise<any>{
		return this.storage.get('Assignments-library')
			.then((assignments: Assignment[]) =>{
				assignments.forEach((element,index) => {
					if(element.Id == assignment.Id){
						assignments.splice(index,1);
					}
				})
				return assignments;
			})
			.then((newAssignments: Assignment[]) =>{
				this.subject.next(newAssignments);
				return this.storage.set('Assignments-library',newAssignments);
			})
	}
	public modifyAssignment(assignment: Assignment): Promise<Assignment[]>{
		return this.storage.get('Assignments-library')
			.then((assignments: Assignment[]) => {
				assignments.forEach((element,index) => {
					if(element.Id == assignment.Id){
						assignments[index] = assignment;
					}
				});
				return assignments;
			})
			.then((newAssignments: Assignment[]) =>{
				this.subject.next(newAssignments);
				return this.storage.set('Assignments-library',newAssignments);
			})
	}

	public subscribeToAssignments(): Observable<any> {
		return this.subject;
	}
}
