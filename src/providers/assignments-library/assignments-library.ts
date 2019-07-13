import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular/platform/platform';
import { Storage } from '@ionic/storage';

import { Assignment } from '../../classes/Assignment';
import { Observable } from 'rxjs/Observable';
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
		public platform: Platform,
		public http: HttpClient,
		public storage: Storage
	) {
	}
	subject = new Subject();

	public async getAssignments(): Promise<any> {
		const assignments = await this.storage.get('Assignments-library');
		this.subject.next(assignments);
		return assignments;
	}

	public async getAssignment(id: string): Promise<Assignment> {
		const assignments = await this.getAssignments()
		let assignmentToReturn = new Assignment();
		assignments.forEach((assignment: Assignment) => {
			if (assignment.Id === id) {
				assignmentToReturn = assignment;
			}
		});
		return assignmentToReturn;
	}

	public async addAssigment(assignment: Assignment): Promise<any> {
		let assignments = await this.storage.get('Assignments-library')
		if (!assignments) {
			assignments = [];
		}
		assignments.push(assignment);
		this.assignments = assignments;
		this.subject.next(assignments);
		return this.storage.set('Assignments-library', assignments);

	}
	public async removeAssignment(assignment: Assignment): Promise<any> {
		let assignments = await this.storage.get('Assignments-library')
		assignments.forEach((element, index) => {
			if (element.Id == assignment.Id) {
				assignments.splice(index, 1);
			}
		})
		this.subject.next(assignments);
		return this.storage.set('Assignments-library', assignments);
	}
	public async modifyAssignment(assignment: Assignment): Promise<Assignment[]> {
		const assignments = await this.storage.get('Assignments-library')
		assignments.forEach((element, index) => {
			if (element.Id == assignment.Id) {
				assignments[index] = assignment;
			}
		});
		this.subject.next(assignments);
		return this.storage.set('Assignments-library', assignments);
	}

	public subscribeToAssignments(): Observable<any> {
		return this.subject;
	}
}
