import { Assignment } from "../../classes/Assignment";
import { Subscription, Subject } from "rxjs";

export class TimerObject extends Assignment{
    timeSubscription?: Subscription;
    timeSubject? : Subject<any>;
    constructor(){
      super();
      this.timeSubject = new Subject();
    }
  }