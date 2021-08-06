import React, { useState, useEffect } from 'react';
import { format, fromUnixTime } from 'date-fns';
import ja from 'date-fns/locale/ja';

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

interface Temp {
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

interface Daily {
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

interface WeatherData {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: Current;
  minutely: Minutely[];
  hourly: Hourly[];
  daily: Daily[];
}

const lat = 35.6518205;
const lon = 139.5446124;

const today = new Date();

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
};

export default function Index() {
  const getData = async () => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=40ce155d4d54e1376534f0dee7ea34f7`;
    const response = await fetch(url);
    const data: WeatherData = await response.json();
    setCurrentWeather(data.current);
    setDailyWeather(data.daily);
  };

  const [currentWeather, setCurrentWeather] = useState<Current>();
  const [dailyWeather, setDailyWeather] = useState<Daily[]>([]);

  useEffect(() => {
    getData();
  }, []);

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

      <JapanMap />

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
              {currentWeather.temp}°
            </div>
            {/* <div id="cweather">{this.state.weather0}</div> */}
            <div className={utilStyles.temperature}>
              {/* <span id="cmaxtem">{this.state.cmaxtem0}°</span>/
              <span id="cminem">{this.state.cmintem0}°</span> */}
            </div>
            {/* <div className={utilStyles.rainyPercent}>{this.state.rain0}</div> */}
          </div>
        </div>

        <ul className={utilStyles.week}>
          {dailyWeather.slice(1).map((x) => (
            <li key={x.dt} className={utilStyles.day}>
              <div id="week1" className={utilStyles.dayofTheweek}>
                {format(fromUnixTime(x.dt), 'yyyy/MM/dd (eee)', { locale: ja })}
              </div>
              <div className={utilStyles.weatherIcon}>
                <i className={getWeatherInfo(x.weather[0])?.weatherIcon} />
              </div>
              <div className={utilStyles.temperature}>
                <span>{x.temp.max}°</span>/<span>{x.temp.min}°</span>
              </div>
            </li>
          ))}
        </ul>
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
