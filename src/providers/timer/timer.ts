import { Injectable } from '@angular/core';
import { Assignment } from '../../classes/Assignment';
import { Observable, Subject, Subscription } from 'rxjs/rx';
import { TimerObject } from './timerObject';
import { AssignmentsLibraryProvider } from '../assignments-library/assignments-library';

@Injectable()
export class TimerProvider {
  timeObservable: Observable<any>;
  timerInterval = 200;
  timerObservables: {Id:string, timerSubscription: Subscription}[] = [];

  constructor(
    private assignmentsLibrary: AssignmentsLibraryProvider
  ) {
    this.timeObservable = Observable.timer(0,this.timerInterval);
  }
  
  public getTime(assignment:Assignment): Subject<any> {  
    const timerObject = this.convertAssignmentToTimerObject(assignment);
    return timerObject.timeSubject;
  }

  convertAssignmentToTimerObject(assignment: Assignment): TimerObject{
    const timerObject = new TimerObject();
    if(assignment.Description) { timerObject.Description = assignment.Description;}
    if(assignment.Duration) { timerObject.Duration = assignment.Duration;}
    if(assignment.EndTime) { timerObject.EndTime = assignment.EndTime;}
    if(assignment.Group) { timerObject.Group = assignment.Group;}
    if(assignment.Id) { timerObject.Id = assignment.Id;}
    if(assignment.InProgress) { timerObject.InProgress = assignment.InProgress;}
    if(assignment.Name) { timerObject.Name = assignment.Name;}
    if(assignment.StartTime) { timerObject.StartTime = assignment.StartTime;}
    if(assignment.timeElapsed) { timerObject.timeElapsed = assignment.timeElapsed;}
    timerObject.timeSubject = new Subject();
    return timerObject
  }

  public async startTimer(assignment: Assignment): Promise<TimerObject>{
    const storedAssignment = await this.assignmentsLibrary.getAssignment(assignment.Id);
    storedAssignment.InProgress = true;
    storedAssignment.StartTime = new Date();
    await this.assignmentsLibrary.modifyAssignment(storedAssignment);
    const updatedAssignment = await this.assignmentsLibrary.getAssignment(assignment.Id)

    const newTimerObject = this.convertAssignmentToTimerObject(updatedAssignment);
    
    const initialTime = updatedAssignment.timeElapsed;
    const timeObs = this.timeObservable.subscribe( (timeElapsedTimer: number) => {
      const time = timeElapsedTimer/(1000/this.timerInterval);
      newTimerObject.timeSubject.next(initialTime+time);
    });

    this.timerObservables.push({Id: assignment.Id, timerSubscription: timeObs });
    return newTimerObject;
  }

  public async stopTimer(assignment: Assignment){
    const storedAssignment = await this.assignmentsLibrary.getAssignment(assignment.Id);
    storedAssignment.InProgress = false;
    storedAssignment.EndTime = new Date();
    let ElapsedTime = new Date(storedAssignment.EndTime).getTime() - new Date(storedAssignment.StartTime).getTime();
    storedAssignment.timeElapsed += (ElapsedTime/1000);
    await this.assignmentsLibrary.modifyAssignment(storedAssignment);

    this.timerObservables.forEach( (timerObservable) => {
      if(timerObservable.Id === assignment.Id){
        timerObservable.timerSubscription.unsubscribe();
      }
    });
  }

}
