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
  timerObjects: TimerObject[] = [];

  constructor(
    private assignmentsLibrary: AssignmentsLibraryProvider
  ) {
    this.timeObservable = Observable.timer(0,this.timerInterval);
  }
  
  public getTime(assignment:Assignment): Subject<any> {  
    const timerObject = Object.assign(new TimerObject(),assignment);
    return timerObject.timeSubject;
  }

  public inizializeTimer(assignment: Assignment) {
    let timerObject;
    const newTimerObject = Object.assign(new TimerObject(),assignment);

    const initialTime = assignment.timeElapsed;
    const timeObs = this.timeObservable.subscribe( () => {
      const time  = (new Date().getTime() - new Date(assignment.StartTime).getTime()) / 1000;
      newTimerObject.timeSubject.next(initialTime+time);
    });

    this.timerObservables.push({Id: assignment.Id, timerSubscription: timeObs });
    timerObject = newTimerObject;
    this.timerObjects.push(timerObject);
  }

  public async startTimer(assignment: Assignment): Promise<void>{
    const updatedAssignment = await this.assignmentsLibrary.getAssignment(assignment.Id)
    updatedAssignment.InProgress = true;
    updatedAssignment.StartTime = new Date();
    await this.assignmentsLibrary.modifyAssignment(updatedAssignment);
    
    const newTimerObject = Object.assign(new TimerObject(),updatedAssignment);

    const initialTime = updatedAssignment.timeElapsed;
    const timeObs = this.timeObservable.subscribe( () => {
      const time  = (new Date().getTime() - new Date(updatedAssignment.StartTime).getTime()) / 1000;
      newTimerObject.timeSubject.next(initialTime+time);
    });

    this.timerObservables.push({Id: assignment.Id, timerSubscription: timeObs });
    this.timerObjects.push(newTimerObject);
  }

  public async stopTimer(assignment: Assignment): Promise<void>{
    const storedAssignment = await this.assignmentsLibrary.getAssignment(assignment.Id);
    storedAssignment.InProgress = false;
    storedAssignment.EndTime = new Date();

    let ElapsedTime = new Date(storedAssignment.EndTime).getTime() - new Date(storedAssignment.StartTime).getTime();
    storedAssignment.timeElapsed += (ElapsedTime/1000);
    await this.assignmentsLibrary.modifyAssignment(storedAssignment);

    const timerObservableindex = this.timerObservables.findIndex( (x)=> x.Id ===assignment.Id ); 
    this.timerObservables[timerObservableindex].timerSubscription.unsubscribe();
    this.timerObservables.splice(timerObservableindex,1);
    
    const timerObjectIndex =  this.timerObjects.findIndex( timerObject => { return timerObject.Id ===  assignment.Id });
    if(this.timerObjects && this.timerObjects.length > 0){
      this.timerObjects.splice(timerObjectIndex,1)
    } 

  }

  getTimerObject(Id: string) {
    return this.timerObjects.find( x => x.Id == Id);
  }

}
