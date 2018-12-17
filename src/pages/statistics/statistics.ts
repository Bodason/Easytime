import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AssignmentsLibraryProvider } from '../../providers/assignments-library/assignments-library';
import { Assignment } from '../../classes/Assignment';

/**
 * Generated class for the StatisticsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html',
})
export class StatisticsPage {
  assignments: Assignment[];
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public assignmentsLibrary: AssignmentsLibraryProvider,
              ) {
  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad StatisticsPage');
    this.assignments = await this.assignmentsLibrary.Assignments;

    this.trace1.x = [];
    this.trace1.y = [];

    this.assignments.forEach((assignment: Assignment, index: number) => {
      this.trace1.x.push(assignment.Name)
      this.trace1.y.push(assignment.timeElapsed);

    })
  }

  public trace1 = { 
    x: [], 
    y: [], 
    type: 'bar' ,
    orientation: 'v',
  };

  public graph = {
    data: [this.trace1],
    layout: {width: 320, height: 400, title: 'Bar Plot'}
  };

}
