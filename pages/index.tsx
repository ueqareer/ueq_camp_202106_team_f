import React, { useState, useEffect } from 'react';

import LoginForm from '@/components/Forms/LoginForm';
import FormDialog from '@/components/Forms/FormDialog';
import Layout from '@/components/Layout';
import JapanMap from '@/components/JapanMap';
import Weather from '@/components/Weather';

import utilStyles from '@/styles/utils.module.css';

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

export interface Hourly {
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
export interface Data{ 
  id: string,
  pref: string,
  lat: number,
  lng:number
}*/

//const lat = 35.6518205;
//const lon = 139.5446124;

const displayWearIcon = (weartemp: Temp) => {
  if (weartemp.min >= 30) {
    return {
      iconlabel: 'wear5.png',
    };
  }
  if (22.5 <= weartemp.min && weartemp.min < 30) {
    return {
      iconlabel: 'wear4.png',
    };
  }
  if (15 <= weartemp.min && weartemp.min < 22.5) {
    return {
      iconlabel: 'wear3.png',
    };
  }
  if (10 <= weartemp.min && weartemp.min < 15) {
    return {
      iconlabel: 'wear2.png',
    };
  }
  if (weartemp.min < 10) {
    return {
      iconlabel: 'outor.png',
    };
  }
};


export default function Index() {
  const [lat, setLat] = useState(35.6518205);
  const [lon, setLon] = useState(139.5446124);
  const [pref, setPref] = useState('東京都');
  // const [indent, setIndent] = useState('13');
  const [open, setOpen] = useState(false);open
  const [openl, setOpenl] = useState(false);openl
  const [viewWear, setViewWear] = useState(false);
  const [viewHot, setViewHot] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenl = () => {
    setOpenl(true);
  };



  const handleClose = () => {
    setOpen(false);
  };

  const handleClosel = () => {
    setOpenl(false);
  };

  const handleOk = (viewWear: boolean, viewHot: boolean) => {
    setViewWear(viewWear);
    setViewHot(viewHot);
    setOpen(false);
  };

  const updateLatLon = (lat: number, lon: number) => {
    setLat(lat);
    setLon(lon);
  };
  const updatePref = (pref: string) => {
    setPref(pref);
  };
  /*
  //const getPlace:React.FC<Props> = { handleSomething }  =>{
  const getPlace  = useCallback((id:string) =>{
    console.log(Data)
    setIndent(id)
    for(var i=0; i<Data.length; i++){
      if(indent===Data[i].id)
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
    console.log(data);
  };

  const [currentWeather, setCurrentWeather] = useState<Current>();
  const [dailyWeather, setDailyWeather] = useState<Daily[]>([]);
  const [hourlyWeather, setHourlyWeather] = useState<Hourly[]>([]);

  useEffect(() => {
    //getPlace(id:string);
    getData();
  }, [lat, lon]); //どっちか片方しか必要ないかも？

  // useEffect(() => {
  //   updatePref(pref);
  //   console.log(updatePref, pref);
  // }, [pref]);

  if (!currentWeather) return null;

  return (

    
    

    <Layout home>
      <div className={utilStyles.header}>
        <div className={utilStyles.headerLogo}>Weather</div>
        <div className={utilStyles.headerList}>
          <ul>
              <LoginForm
               openl={openl}
        handleClosel={handleClosel}
              />
          <div>
        <button onClick={handleClickOpenl}>ログイン</button>
      </div>
          </ul>
        </div>
      </div>

      <div className={utilStyles.main}>
        <div className={utilStyles.container1}>
          <h1>
            Weather<span>.</span>
          </h1>
          <h2>毎日時の天気予報</h2>
        </div>
      </div>

      <div className={utilStyles.container}>
        <JapanMap updateLatLon={updateLatLon} updatePref={updatePref} />
        <Weather
          currentWeather={currentWeather}
          dailyWeather={dailyWeather}
          hourlyWeather={hourlyWeather}
          pref={pref}
        />
      </div>

      <FormDialog
        open={open}
        handleClose={handleClose}
        handleOk={handleOk}
        viewWear={viewWear}
        viewHot={viewHot}
      />

      <div className={utilStyles.wear}>
        <button onClick={handleClickOpen}>指数追加</button>
      </div>

      {viewWear && (
        <div className={utilStyles.wearicon}>
          {dailyWeather.slice(0, 1).map((x) => (
            <li key={x.dt}>
              <div>服装指数</div>
              <img
                src={displayWearIcon(x.temp)?.iconlabel}
                height={50}
                width={50}
              />
            </li>
          ))}
        </div>
      )}

      {viewHot && (
        <div className={utilStyles.wearicon}>
          {dailyWeather.slice(0, 1).map((x) => (
            <li key={x.dt}>
              <div>熱中症指数</div>
              <img
                src={displayWearIcon(x.temp)?.iconlabel}
                height={50}
                width={50}
              />
            </li>
          ))}
        </div>
      )}

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
