import { GraphLibraryProvider } from './../../providers/graph-library/graph-library';
import { Pages } from './../../enums/pages';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AssignmentsLibraryProvider } from '../../providers/assignments-library/assignments-library';
import { Assignment } from '../../classes/Assignment';
import { Subscription } from 'rxjs/Subscription';
import { Plotly } from 'angular-plotly.js/src/app/plotly/plotly.service';

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
  resizeWatcher: Subscription;
  assignments: Assignment[];
  pageName = Pages.Statistics;
  platforms: string[];
  graph: Plotly.Figure;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public assignmentsLibrary: AssignmentsLibraryProvider,
              private platform: Platform,
              private graphLibrary: GraphLibraryProvider
              ) {
  }

  ionViewDidLeave(){
    if(this.resizeWatcher){
      this.resizeWatcher.unsubscribe();
    }
  }

  async ionViewDidLoad() {
    const heightScale = 0.8;
    const widthScale = 0.95;
    this.assignments = await this.assignmentsLibrary.getAssignments();
    this.platforms = this.platform.platforms()
    this.graph = this.graphLibrary.setupGraph(this.trace1, this.platform.width() * widthScale, this.platform.height() * heightScale);
    this.resizeWatcher = this.platform.resize.subscribe( x => {
      this.graphLibrary.setDimensions({width: this.platform.width() * widthScale, height: this.platform.height() * heightScale});
      this.graph = this.graphLibrary.setupGraph(this.trace1);
    });

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
    marker: {
      color: '#aaa'
    }
  };


}
