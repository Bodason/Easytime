import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Assignment } from '../../classes/Assignment';
import { Subscription } from 'rxjs/Subscription';
import { Observable, Subject } from 'rxjs/rx';
import { of } from 'rxjs/observable/of';


export class TimerObject extends Assignment{
  timeSubscription?: Subscription;
  timeSubject? : Subject<any>;
  constructor(){
    super();
  }
}

@Injectable()
export class TimerProvider {
  timerObjects: TimerObject[] = [];
  timeObservable: Observable<any>;

  constructor() {
    this.timeObservable = Observable.timer(0,500);
  }
  
  public getTime(assignment:Assignment): Subject<any>{
    const index = this.indexOfTimer(assignment.Id);
    return this.timerObjects[index].timeSubject;
  }

  public startTimer(timerObject: TimerObject|Assignment){
    let timerIndex = this.indexOfTimer(timerObject.Id);
    if(timerIndex === -1){
      this.startNewTimer(timerObject)
    } else {
      this.startExistingTimer(this.timerObjects[timerIndex]);
      }
  }
  
  public stopTimer(timerObject: TimerObject|Assignment){
    let timerIndex = this.indexOfTimer(timerObject.Id);
    if(timerIndex > -1){
      this.timerObjects[timerIndex].timeSubscription.unsubscribe();  
    }
  }

  private startNewTimer(timerObject: TimerObject){
    let newTimerObject = timerObject
    newTimerObject['timeSubject'] = new Subject();
    newTimerObject['timeSubscription'] = this.timeObservable
      .subscribe(timeElapsedSinceStart => {
          let timer = timerObject.timeElapsed + timeElapsedSinceStart /2;
          newTimerObject['timeSubject'].next(timer);

      });
      this.timerObjects.push(newTimerObject);
  }

  private startExistingTimer(timerObject: TimerObject){
    timerObject['timeSubject'] = new Subject();
    timerObject['timeSubscription'] = this.timeObservable
      .subscribe(timeElapsedSinceStart => {
        let timer = timerObject.timeElapsed + timeElapsedSinceStart/2;
        const index = this.indexOfTimer(timerObject.Id);
        this.timerObjects[index]['timeSubject'].next(timer);
      });  
  }

  private indexOfTimer(id: string): number{
    let timerIndex = -1;
    this.timerObjects.forEach((timerObject: Assignment, index: number) => {
      if(timerObject.Id === id){
        timerIndex = index;
      }
    })
    return timerIndex;
  }

}
