import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GraphLibraryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GraphLibraryProvider {
  graph = {};
  private graphArgs = {
    width: 320,
    height: 400
  }
  setDimensions(args: { width: number; height: number; }) {
    this.graphArgs.width = args.width,
    this.graphArgs.height = args.height
  }
  setupGraph(data, width = this.graphArgs.width, height = this.graphArgs.height): any {
    this.graph = {
      data: [data],
      layout: {
        width:width, 
        height: height, 
        title: 'Bar Plot', 
        plot_bgcolor:"#d3d3d3", 
        paper_bgcolor:"#d3d3d3",
        xaxis: {
          showticklabels: true,
          tickangle: 'auto',
          tickfont: {
            family: 'Old Standard TT, serif',
            size: 12,
            color: 'black'
          },
        },
      },
    };
    return this.graph;
  }

  constructor(public http: HttpClient) {
    console.log('Hello GraphLibraryProvider Provider');
  }

 

}
