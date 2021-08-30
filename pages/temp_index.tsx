import React, { useState, useEffect, useContext } from 'react';

import FormDialog from '@/components/Forms/FormDialog';
import Layout from '@/components/Layout';
import JapanMap from '@/components/JapanMap';
import Weather from '@/components/Weather';

import utilStyles from '@/styles/utils.module.css';

import { useRouter } from 'next/router';
import firebase from 'firebase/app';
import { auth, firestore } from 'utils/firebase';
import { /*AuthProvider, */ AuthContext } from '@/auth/AuthProvider';
import AddIvent from '@/components/Forms/AddIvent ';

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

type RegisterdData = {
  date: Date;
  notified: boolean;
  spot: string;
  weather: string;
  schedule: Date;
};

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
  const [open, setOpen] = useState(false);
  open;
  const [viewWear, setViewWear] = useState(false);
  const [viewHot, setViewHot] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const router = useRouter();
  const [regiData, setRegiData] = useState<RegisterdData[]>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

  const getData = async () => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=40ce155d4d54e1376534f0dee7ea34f7`;
    const response = await fetch(url);
    const data: WeatherData = await response.json();
    setCurrentWeather(data.current);
    setDailyWeather(data.daily);
    setHourlyWeather(data.hourly);
    console.log(data);
  };

  const value_test_notified = false;
  const value_test_spot = '新潟';
  const value_test_weather = 'cloudy';
  const value_test_schedule = 'August 22, 2021';

  function sendTest() {
    if (currentUser) {
      console.log(currentUser);
      firestore
        .collection('users')
        .doc(currentUser.uid)
        .collection('notification_data')
        .add({
          date: firebase.firestore.FieldValue.serverTimestamp(),
          notified: value_test_notified,
          spot: value_test_spot,
          weather: value_test_weather,
          schedule: firebase.firestore.Timestamp.fromDate(
            new Date(value_test_schedule)
          ),
        });
    }
  }

  function getTest() {
    if (currentUser) {
      console.log(currentUser);
      firestore
        .collection('users')
        .doc(currentUser.uid)
        .collection('notification_data')
        .get()
        .then((snapshot) => {
          const data = snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              date: doc.data().date.toDate(),
              schedule: doc.data().schedule.toDate(),
            } as RegisterdData;
            // setPositionData(data);
            // console.log('Document data', data);
          });
          setRegiData(data);
        });
    }
  }

  const logOut = async () => {
    try {
      await auth.signOut();
      router.push('/');
    } catch (error) {
      alert(error.message);
    }
  };

  const sendInfo = (value_spot: string, value_schedule: string) => {
    console.log(value_spot);
    console.log(value_schedule);
    if (currentUser) {
      console.log(currentUser);
      firestore
        .collection('users')
        .doc(currentUser.uid)
        .collection('notification_data')
        .add({
          date: firebase.firestore.FieldValue.serverTimestamp(),
          spot: value_spot,
          schedule: firebase.firestore.Timestamp.fromDate(
            new Date(value_schedule)
          ),
        });
    }
    setAddOpen(false);
  };

  const [addOpen, setAddOpen] = useState(false);

  const handleClickOpena = () => {
    setAddOpen(true);
  };

  const handleClickClose = () => {
    setAddOpen(false);
  };

  const [currentWeather, setCurrentWeather] = useState<Current>();
  const [dailyWeather, setDailyWeather] = useState<Daily[]>([]);
  const [hourlyWeather, setHourlyWeather] = useState<Hourly[]>([]);

  useEffect(() => {
    //getPlace(id:string);
    getData();
  }, [lat, lon]); //どっちか片方しか必要ないかも？

  if (!currentWeather) return null;

  return (
    <Layout home>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
        crossOrigin="anonymous"
      />
      <div className={utilStyles.header}>
        <div className={utilStyles.headerLogo}>Weather notify login</div>
        <div className={utilStyles.headerList}>
          <button className="btn btn-primary" onClick={logOut}>
            Logout
          </button>
        </div>
      </div>

      <div className={utilStyles.main}>
        <div className={utilStyles.container1}>
          <h1>週間予報</h1>
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

      <div className="card text-white bg-info w-25">
        {/* <div className={utilStyles.footer}>
        <div className={utilStyles.footerLogo}>追加項目</div>
        <div className={utilStyles.footerList}> */}
        <div className="card-footer">追加項目</div>
        <div className="card-body">
          <FormDialog
            open={open}
            handleClose={handleClose}
            handleOk={handleOk}
            viewWear={viewWear}
            viewHot={viewHot}
            viewRay
            viewFeel
            viewSleep
            viewUmbrella
          />

          <div className={utilStyles.wear}>
            <button className="btn btn-primary" onClick={handleClickOpen}>
              指数を追加
            </button>
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

          <div>
            <AddIvent
              addOpen={addOpen}
              handleClickClose={handleClickClose}
              sendInfo={sendInfo}
            />
            <div className={utilStyles.wear}>
              <button className="btn btn-primary" onClick={handleClickOpena}>
                日程を追加
              </button>
              <button onClick={getTest}>GetTest</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
