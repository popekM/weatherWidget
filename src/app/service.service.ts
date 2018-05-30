import { Injectable } from '@angular/core';
import { CityData, WeatherData, DisplayData } from './interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  // store all cities data
  readonly cities: Array<CityData> = [
    { name: 'Lodz', woeid: 505120, link: 'https://www.yahoo.com/news/weather/poland/lodz/lodz-505120' },
    { name: 'Warszawa', woeid: 523920, link: 'https://www.yahoo.com/news/weather/poland/warsaw/warsaw-523920' },
    { name: 'Berlin', woeid: 638242, link: 'https://www.yahoo.com/news/weather/germany/berlin/berlin-638242' },
    { name: 'New York', woeid: 2459115, link: 'https://www.yahoo.com/news/weather/united-states/new-york/new-york-2459115' },
    { name: 'Londyn', woeid: 44418, link: 'https://www.yahoo.com/news/weather/united-kingdom/london/london-44418' }
  ];

  // contains 3 indexes of cities to display in page
  randomIndexes: number[] = [0, 1, 2];

  private dataToDisplayStream = new Subject<any>();

  constructor(private http: HttpClient) { }

  // pick 3 random indexes from cities array and
  // store it in randomIndexes array
  pickRandomIndexes() {
    const maximumIndex = this.cities.length;
    const numberOfIndexes = 3;

    if (maximumIndex < numberOfIndexes) throw new Error('Number of all cities must be equal or greater than number of displayed cities');

    this.randomIndexes = [];
    do {
      let index = Math.floor(Math.random() * maximumIndex);

      // check if we already have index in randomIndexes array
      let temp = this.randomIndexes.findIndex((el) => el === index);
      if (temp === -1) {
        this.randomIndexes.push(index);
      }
    } while (this.randomIndexes.length < numberOfIndexes);
  }

  buildUrl() {
    return 'https://query.yahooapis.com/v1/public/yql?q=select%20item.condition.temp%2C%20item.condition.text%20from%20weather.forecast%20where%20woeid%20%3D%20' + this.cities[this.randomIndexes[0]].woeid + '%20or%20woeid%20%3D%20' + this.cities[this.randomIndexes[1]].woeid + '%20or%20woeid%20%3D%20' + this.cities[this.randomIndexes[2]].woeid + '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
  }

  getDataFromApi() {
    let url: string = this.buildUrl();
    return this.http.get<WeatherData>(url).subscribe(data => {
      let dataToDisplay: Array<DisplayData> = [];
      for (let i = 0; i < 3; i++) {
        let temp: DisplayData = {
          cityName: this.cities[this.randomIndexes[i]].name,
          temperatue: this.fahrenheitToCelsius(data.query.results.channel[i].item.condition.temp),
          weather: data.query.results.channel[i].item.condition.text,
          link: this.cities[this.randomIndexes[i]].link
        };
        dataToDisplay.push(temp);
      }
      this.dataToDisplayStream.next(dataToDisplay);
    });
  }

  getDataToDisplay() {
    return this.dataToDisplayStream.asObservable();
  }

  fahrenheitToCelsius(temp) {
    return Math.round((temp - 32) * 5 / 9);
  }
}
