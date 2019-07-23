import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StatisticsPage } from './statistics';
import { PlotlyModule } from 'angular-plotly.js';

@NgModule({
  declarations: [
    StatisticsPage,
  ],
  imports: [
    PlotlyModule,
    IonicPageModule.forChild(StatisticsPage),
  ],
})
export class StatisticsPageModule {}
