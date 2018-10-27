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
  public get StaticAssignments(){
  	return this.assignments;
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
	public modifyAssignment(assignment: Assignment): Promise<any>{
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

	public startTimer(assignment: Assignment){
		return this.storage.get('Assignments-library')
			.then((assignments: Assignment[]) => {
				assignments.forEach((element,index) => {
					if(element.Id == assignment.Id){
						assignments[index].InProgress = true;
						assignments[index].StartTime = new Date() 
					}
				});
				return assignments;
			})
			.then((newAssignments: Assignment[]) => {
				this.subject.next(newAssignments);
				return this.storage.set('Assignments-library',newAssignments);
			})
	}

	public stopTimer(assignment: Assignment){
		return this.storage.get('Assignments-library')
			.then((assignments: Assignment[]) => {
				assignments.forEach((element,index) => {
					if(element.Id == assignment.Id){
						assignments[index].InProgress = false;
						assignments[index].EndTime = new Date(); 
						let ElapsedTime = new Date(assignments[index].EndTime).getTime() - new Date(assignments[index].StartTime).getTime();
						assignments[index].timeElapsed += (ElapsedTime/1000);
					}
				});
				return assignments;
			})
			.then((newAssignments: Assignment[]) =>{
				this.subject.next(newAssignments);
				return this.storage.set('Assignments-library',newAssignments);
			})
	}

}
