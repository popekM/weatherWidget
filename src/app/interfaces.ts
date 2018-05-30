export interface CityData {
  name: string,
  woeid: number,   // identification number used by yahoo api
  link: string
}

// data returned from yahoo api
export interface WeatherData{
   query: {
    count: number,
    created: string,
    lang: string,
    results: {
     channel: [{
      item: {
       condition: {
        temp: number,
        text: string
       }
      }
     }]
    }
   }
};

export interface DisplayData{
  cityName: string,
  temperatue: number,
  weather: string,
  link: string
}
