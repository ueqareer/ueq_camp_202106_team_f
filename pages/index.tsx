import React, { useState, useEffect, /*useCallback*/ } from 'react';
import { format, fromUnixTime } from 'date-fns';
import ja from 'date-fns/locale/ja';
//import Data from '@/public/data/japan.json'
//import Checkbox from '@/components/checkbox';

import Layout from '@/components/Layout';
import utilStyles from '@/styles/utils.module.css';
import JapanMap from '@/components/JapanMap';

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Current {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  weather: Weather[];
}

interface Minutely {
  dt: number;
  precipitation: number;
}

interface Weather2 {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Hourly {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: Weather2[];
  pop: number;
}

export interface Temp {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

interface FeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

interface Weather3 {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Daily {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  temp: Temp;
  feels_like: FeelsLike;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: Weather3[];
  clouds: number;
  pop: number;
  rain: number;
  uvi: number;
}

export interface WeatherData {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: Current;
  minutely: Minutely[];
  hourly: Hourly[];
  daily: Daily[];
}

/*
export Data{ 
  id: string, 
  pref: string, 
  lat: number, 
  lng:number
}
*/

const lat = 35.6518205;
const lon = 139.5446124;

const today = new Date();

const displayWearIcon = (weartemp:Daily)=>{
  if(weartemp.temp.min>=30){
    return{
      iconlabel:'wear5.png'
    }
  }
  if(22.5<=weartemp.temp.min && weartemp.temp.min<30){
    return{
      iconlabel:'wear4.png'
    }
  }
  if(15<=weartemp.temp.min && weartemp.temp.min<22.5){
    return{
      iconlabel:'wear3.png'
    }
  }
  if(10<=weartemp.temp.min && weartemp.temp.min<15){
    return{
      iconlabel:'wear2.png'
    }
  }
  if(weartemp.temp.min<10){
    return{
      iconlabel:'outor.png'
    }
  }
}

const getWeatherInfo = (weather: Weather) => {
  if (weather.main === 'Clouds') {
    return {
      label: '曇り',
      weatherIcon: 'wi wi-cloud',
    };
  }
  if (weather.main === 'Clear') {
    return {
      label: '快晴',
      weatherIcon: 'wi wi-day-sunny',
    };
  }
  if (weather.main === 'Snow') {
    return {
      label: '雪',
      weatherIcon: 'wi wi-snow',
    };
  }if (weather.main === 'Rain') {
    return {
      label: '雨',
      weatherIcon: 'wi wi-rain',
    };
  }if (weather.main === 'Drizzle') {
    return {
      label: '霧雨',
      weatherIcon: 'wwi wi-sleet',
    };
  }if (weather.main === 'Thunderstorm') {
    return {
      label: '雷雨',
      weatherIcon: 'wi wi-thunderstorm',
    };
  }else{
    return {
      label: '',
      weatherIcon: 'wi wi-dust',
    };
  }
};

export default function Index() {
  /*
  const [lat, setLat] = useState(35.6518205);
  const [lon, setLon] = useState(139.5446124);

  const getPlace  = useCallback((id:string) =>{
    console.log(Data)
    for(var i=0; i<Data.length; i++){
      if(id===Data[i].id)
      setLat(Data[i].lat)
      setLon(Data[i].lng)
    }
  },[setLat, setLon]);
  */

  const getData = async () => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=40ce155d4d54e1376534f0dee7ea34f7`;
    const response = await fetch(url);
    const data: WeatherData = await response.json();
    setCurrentWeather(data.current);
    setDailyWeather(data.daily);
    setHourlyWeather(data.hourly);
    //console.log(currentWeather);
    //console.log(dailyWeather);
  };

  const [currentWeather, setCurrentWeather] = useState<Current>();
  const [dailyWeather, setDailyWeather] = useState<Daily[]>([]);
  const [hourlyWeather, setHourlyWeather] = useState<Hourly[]>([]);

  useEffect(() => {
    //getPlace(id:string);
    getData();
  }, []/*[lat, lon]*/);


  if (!currentWeather) return null;

  return (
    <Layout home>
      <div className={utilStyles.header}>
        <div className={utilStyles.headerLogo}>Weather</div>
        <div className={utilStyles.headerList}>
          <ul>
            <li>週間天気予報</li>
            <li>その他</li>
            <li>その他</li>
          </ul>
        </div>
      </div>

      <div className={utilStyles.main}>
        <div className={utilStyles.container1}>
          <h1>
            Weahter<span>.</span>
          </h1>
          <h2>毎日時の天気予報</h2>
        </div>
      </div>

      <JapanMap /*getPlace={getPlace}*//>

      <>
      {/*<Checkbox />*/}
       </>

      <div className={utilStyles.weather}>
        <div className={utilStyles.today}>
          {format(today, 'yyyy/MM/dd (eee)', { locale: ja })}
          <div className={utilStyles.weatherIcon}>
            <i
              className={
                getWeatherInfo(currentWeather?.weather[0])?.weatherIcon
              }
            />
          </div>
          <div className={utilStyles.weatherDetail}>
            <div id="ctempid" className={utilStyles.currenTemperature}>
              {Math.round(currentWeather.temp)}°
            </div>
            <div id="cweather">{getWeatherInfo(currentWeather?.weather[0])?.label}</div>
            <div className={utilStyles.temperature}>
              <span id="cmaxtem">{Math.round(dailyWeather[0]?.temp.max)}°</span>/
              <span id="cminem">{Math.round(dailyWeather[0]?.temp.min)}°</span>
            </div>
            <div className={utilStyles.rainyPercent}>降水 {hourlyWeather[0]?.pop*100}%</div>
          </div>
        </div>

        <ul className={utilStyles.week}>
          {dailyWeather.slice(1,7).map((x) => (
            <li key={x.dt} className={utilStyles.day}>
              <div id="week1" className={utilStyles.dayofTheweek}>
                {format(fromUnixTime(x.dt), 'yyyy/MM/dd (eee)', { locale: ja })}
              </div>
              <div className={utilStyles.weatherIcon}>
                <i className={getWeatherInfo(x.weather[0])?.weatherIcon} />
              </div>
              <div className={utilStyles.temperature}>
                <span>{Math.round(x.temp.max)}°</span>/<span>{Math.round(x.temp.min)}°</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <button>服装指数</button>
      <div className="j">
        <img src={displayWearIcon(dailyWeather[0])?.iconlabel} height={50} width={50} />
      </div>

      <div className={utilStyles.footer}>
        <div className={utilStyles.footerLogo}>WeatherAPI</div>
        <div className={utilStyles.footerList}>
          <ul>
            <li>適当</li>
            <li>お問い合わせ</li>
            <li>わああああ</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
