import { Component, OnInit } from '@angular/core';
import { ServiceService } from './service.service';
import { DisplayData } from './interfaces';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private service: ServiceService) { }

  data: Array<DisplayData> = [];

  updateDataPercent: number = 100;
  changeCitesPercent: number = 0;

  ngOnInit(): void {
    this.service.pickRandomIndexes();
    this.service.getDataFromApi();
    this.service.getDataToDisplay().subscribe(data => {
      this.data = data;
    });

    let time: number = 60000;

    setInterval(() => {
      time -= 1000;

      this.updateDataPercent = Math.floor(((time - 1000) % 10000) / 100);
      this.changeCitesPercent = Math.floor(100 - (60000 - (time - 1000)) / 600);

      if (time === 0) {
        this.service.pickRandomIndexes();
        time = 60000;
      }
      if (time % 10000 === 0) {
        this.service.getDataFromApi();
      }
    }, 1000);

  }
}
