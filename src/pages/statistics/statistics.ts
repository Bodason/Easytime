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
              public assignmentsLibrary: AssignmentsLibraryProvider) {
  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad StatisticsPage');
    this.assignments = await this.assignmentsLibrary.Assignments;
  }

}
