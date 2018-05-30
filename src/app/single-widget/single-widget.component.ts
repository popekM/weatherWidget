import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[app-single-widget]',
  templateUrl: './single-widget.component.html',
  styleUrls: ['./single-widget.component.css']
})
export class SingleWidgetComponent implements OnInit {

  @Input() name;
  @Input() temp;
  @Input() weather;

  icon: string;

  constructor() { }

  ngOnInit() {
    switch (this.weather) {
      case 'Sunny':
        this.icon = 'wi-day-sunny';
        break;

      case 'Thunderstorms':
        this.icon = 'wi-thunderstorm';
        break;

      case 'Showers':
        this.icon = 'wi-sprinkle';
        break;

      case 'Snow':
        this.icon = 'wi-snow';
        break;

      case 'Windy':
        this.icon = 'wi-windy';
        break;

      case 'Cloudy':
        this.icon = 'wi-cloudy';
        break;

      case 'Mostly Cloudy':
        this.icon = 'wi-cloud';
        break;

      default:
        this.icon = 'wi-day-cloudy';
        break;

    }
  }

}
