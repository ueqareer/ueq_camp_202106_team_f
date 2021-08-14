import React from 'react';
import { format, fromUnixTime } from 'date-fns';
import ja from 'date-fns/locale/ja';

import { Weather as WeatherType, Current, Daily, Hourly } from '@/pages';
import utilStyles from '@/styles/utils.module.css';

const today = new Date();

const getWeatherInfo = (weather: WeatherType) => {
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
  }
  if (weather.main === 'Rain') {
    return {
      label: '雨',
      weatherIcon: 'wi wi-rain',
    };
  }
  if (weather.main === 'Drizzle') {
    return {
      label: '霧雨',
      weatherIcon: 'wwi wi-sleet',
    };
  }
  if (weather.main === 'Thunderstorm') {
    return {
      label: '雷雨',
      weatherIcon: 'wi wi-thunderstorm',
    };
  } else {
    return {
      label: '',
      weatherIcon: 'wi wi-dust',
    };
  }
};

type Props = {
  currentWeather: Current;
  dailyWeather: Daily[];
  hourlyWeather: Hourly[];
};

const Weather: React.FC<Props> = ({
  currentWeather,
  dailyWeather,
  hourlyWeather,
}) => {
  return (
    <div className={utilStyles.weather}>
      <div className={utilStyles.today}>
        {format(today, 'yyyy/MM/dd (eee)', { locale: ja })}
        <div className={utilStyles.weatherIcon}>
          <i
            className={getWeatherInfo(currentWeather?.weather[0])?.weatherIcon}
          />
        </div>
        <div className={utilStyles.weatherDetail}>
          <div id="ctempid" className={utilStyles.currenTemperature}>
            {Math.round(currentWeather.temp)}°
          </div>
          <div id="cweather">
            {getWeatherInfo(currentWeather?.weather[0])?.label}
          </div>
          <div className={utilStyles.temperature}>
            <span id="cmaxtem">{Math.round(dailyWeather[0]?.temp.max)}°</span>/
            <span id="cminem">{Math.round(dailyWeather[0]?.temp.min)}°</span>
          </div>
          <div className={utilStyles.rainyPercent}>
            降水 {hourlyWeather[0]?.pop * 100}%
          </div>
        </div>
      </div>

      <ul className={utilStyles.week}>
        {dailyWeather.slice(1, 7).map((x) => (
          <li key={x.dt} className={utilStyles.day}>
            <div id="week1" className={utilStyles.dayofTheweek}>
              {format(fromUnixTime(x.dt), 'yyyy/MM/dd (eee)', { locale: ja })}
            </div>
            <div className={utilStyles.weatherIcon}>
              <i className={getWeatherInfo(x.weather[0])?.weatherIcon} />
            </div>
            <div className={utilStyles.temperature}>
              <span>{Math.round(x.temp.max)}°</span>/
              <span>{Math.round(x.temp.min)}°</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Weather;
