import React, { useState, useEffect, useContext} from 'react';

import LoginFormDialog from '@/components/Forms/LoginFormDialog';
import Layout from '@/components/Layout';
import JapanMap from '@/components/JapanMap';
import Weather from '@/components/Weather';

import utilStyles from '@/styles/utils.module.css';

import { useRouter } from 'next/router';
import firebase from 'firebase/app';
import { auth, firestore } from 'utils/firebase';
import { /*AuthProvider, */ AuthContext } from '@/auth/AuthProvider';
import AddIvent from '@/components/Forms/AddIvent '


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
      iconlabel: '../wear/wear5.png',
    };
  }
  if (22.5 <= weartemp.min && weartemp.min < 30) {
    return {
      iconlabel: '../wear/wear4.png',
    };
  }
  if (15 <= weartemp.min && weartemp.min < 22.5) {
    return {
      iconlabel: '../wear/wear3.png',
    };
  }
  if (10 <= weartemp.min && weartemp.min < 15) {
    return {
      iconlabel: '../wear/wear2.png',
    };
  }
  if (weartemp.min < 10) {
    return {
      iconlabel: '../wear/wear1.png',
    };
  }
};

const displayHotIcon = (tCurrent: Current)=>{
  if (tCurrent.feels_like>=35){
    return {
      iconlabel: './hot/hot5.png',
    };
  }
  if (tCurrent.feels_like>=28&&tCurrent.feels_like<35){
    return {
      iconlabel: './hot/hot4.png',
    };
  }
  if (tCurrent.feels_like>=20&&tCurrent.feels_like<28){
    return {
      iconlabel: './hot/hot3.png',
    };
  }
  if (tCurrent.feels_like>=8&&tCurrent.feels_like<20){
    return {
      iconlabel: './hot/hot2.png',
    };
  }
  if (tCurrent.feels_like<8){
    return {
      iconlabel: './hot/hot1.png',
    };
  }
}

const displayFeelIcon = (tCurrent: Current)=>{
  let feelnum = 0.81*tCurrent.temp+0.01*tCurrent.humidity*(0.99*tCurrent.temp-14.3)+46.3
  if (feelnum<=60){
    return {
      iconlabel: './feel/feel5.png',
    };
  }
  if (feelnum<=70&&feelnum>60){
    return {
      iconlabel: './feel/feel4.png',
    };
  }
  if (feelnum<=78&&feelnum>70){
    return {
      iconlabel: './feel/feel3.png',
    };
  }
  if (feelnum<=85&&feelnum>78){
    return {
      iconlabel: './feel/feel2.png',
    };
  }
  if (feelnum>85){
    return {
      iconlabel: './feel/feel1.png',
    };
  }
}

const displaySleepIcon = (tDaily: Daily)=>{
  if (tDaily.feels_like.night>=33||tDaily.feels_like.night<=0){
    return {
      iconlabel: './sleep/sleep1.png',
    };
  }
  if ((tDaily.feels_like.night<33&&tDaily.feels_like.night>=30)||(tDaily.feels_like.night>0&&tDaily.feels_like.night<=5)){
    return {
      iconlabel: './sleep/sleep2.png',
    };
  }
  if ((tDaily.feels_like.night<30&&tDaily.feels_like.night>=28)||(tDaily.feels_like.night>5&&tDaily.feels_like.night<=10)){
    return {
      iconlabel: './sleep/sleep3.png',
    };
  }
  if ((tDaily.feels_like.night<28&&tDaily.feels_like.night>=25)||(tDaily.feels_like.night>10&&tDaily.feels_like.night<=15)){
    return {
      iconlabel: './sleep/sleep2.png',
    };
  }
  if (tDaily.feels_like.night<25&&tDaily.feels_like.night>15){
    return {
      iconlabel: './sleep/sleep1.png',
    };
  }
}

const displayRayIcon = (tCurrent: Current)=>{
  if (tCurrent.uvi>=11){
    return {
      iconlabel: './ray/ray5.png',
    };
  }
  if (tCurrent.uvi>=8&&tCurrent.uvi<11){
    return {
      iconlabel: './ray/ray4.png',
    };
  }
  if (tCurrent.uvi>=6&&tCurrent.uvi<8){
    return {
      iconlabel: './ray/ray3.png',
    };
  }
  if (tCurrent.uvi>=3&&tCurrent.uvi<6){
    return {
      iconlabel: './ray/ray2.png',
    };
  }
  if (tCurrent.uvi<3){
    return {
      iconlabel: './ray/ray1.png',
    };
  }
}

const displayUmbrellaIcon = (wDaily: Daily[])=>{
  let dailyPop=wDaily[0].pop;
  for(let i=0; i<12; i++){
    if(wDaily[i]?.pop>dailyPop) dailyPop=wDaily[i].pop;
  }
  
  if (dailyPop>=80){
    return {
      iconlabel: './umbrella/umbrella5.png',
    };
  }
  if (dailyPop>=60&&dailyPop<80){
    return {
      iconlabel: './umbrella/umbrella4.png',
    };
  }
  if (dailyPop>=30&&dailyPop<50){
    return {
      iconlabel: './umbrella/umbrella3.png',
    };
  }
  if (dailyPop>=20&&dailyPop<30){
    return {
      iconlabel: './umbrella/umbrella2.png',
    };
  }
  if (dailyPop<10){
    return {
      iconlabel: './umbrella/umbrella1.png',
    };
  }
}

export default function Index() {
  const [lat, setLat] = useState(35.6518205);
  const [lon, setLon] = useState(139.5446124);
  const [pref, setPref] = useState('東京都');
  // const [indent, setIndent] = useState('13');
  const [open, setOpen] = useState(false);open
  const [viewWear, setViewWear] = useState(false);
  const [viewHot, setViewHot] = useState(false);
  const [viewFeel, setViewFeel] = useState(false);
  const [viewRay, setViewRay] = useState(false);
  const [viewSleep, setviewSleep] = useState(false);
  const [viewUmbrella, setviewUmbrella] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const router = useRouter();
  const [regiData, setRegiData] = useState<RegisterdData[]>();


  const handleClickOpen = () => {
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
  };

  const handleOk = (viewWear: boolean, viewHot: boolean, viewFeel: boolean, viewRay: boolean, viewSleep: boolean, viewUmbrella:boolean) => {
    setViewWear(viewWear);
    setViewHot(viewHot);
    setViewFeel(viewFeel);
    setViewRay(viewRay);
    setviewSleep(viewSleep);
    setviewUmbrella(viewUmbrella);
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
/*
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
*/

  const logOut = async () => {
    try {
      await auth.signOut();
      router.push('/');
    } catch (error) {
      alert(error.message);
    }
  };

  const sendInfo=(value_spot:string, value_schedule:string)=>{
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
  }

  const [addOpen, setAddOpen] = useState(false);

  const handleClickOpena = () => {
    setAddOpen(true);
  };

  const handleClickClose = () => {
    setAddOpen(false);
  };
/*
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
*/
  const [docNumber, setDocNumber] = useState(0);

  const docNumber_func = async () => {
    if (currentUser) {
    await firestore
      .collection('users')
      .doc(currentUser?.uid)
      .collection('notification_data')
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            //date: doc.data().date.toDate(),
            schedule: doc.data().schedule.toDate(),
          } as RegisterdData;
        });
        setDocNumber(data.length);
        console.log(data);
        setRegiData(data);
      });
    }
  };

  useEffect(() => {
    docNumber_func();
    console.log(docNumber);
  },[docNumber]);
/*
  if (regiData) {
    for (let i = 0; i < docNumber; i++) {
      console.log(regiData[i].spot);
      console.log(regiData[i].schedule);
    }
  }
*/



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
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossOrigin="anonymous"/>
      <div className={utilStyles.header}>
        <div className={utilStyles.headerLogo}>Weather notify login</div>
        <div className={utilStyles.headerList}>
          <button className="btn btn-primary" onClick={logOut}>Logout</button>
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

<div className= "card text-white bg-info w-25">
      {/* <div className={utilStyles.footer}>
        <div className={utilStyles.footerLogo}>追加項目</div>
        <div className={utilStyles.footerList}> */}
 <div className="card-footer">
    追加項目
  </div>
  <div className="card-body">
      <LoginFormDialog
        open={open}
        handleClose={handleClose}
        handleOk={handleOk}
        docNumber_func={docNumber_func}
        viewWear={viewWear}
        viewHot={viewHot}
        viewFeel={viewFeel}
        viewRay={viewRay}
        viewSleep={viewSleep}
        viewUmbrella={viewUmbrella}
      />

      <div className={utilStyles.wear}>
        <button className="btn btn-primary" onClick={handleClickOpen}>指数を追加</button>
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
              <div>体感温度指数</div>
              <img
                src={displayHotIcon(currentWeather)?.iconlabel}
                height={60}
                width={60}
              />
        </div>
      )}

      {viewFeel && (
        <div className={utilStyles.wearicon}>
              <div>不快度指数</div>
              <img
                src={displayFeelIcon(currentWeather)?.iconlabel}
                height={60}
                width={60}
              />
        </div>
      )}

      {viewRay && (
        <div className={utilStyles.wearicon}>
              <div>紫外線指数</div>
              <img
                src={displayRayIcon(currentWeather)?.iconlabel}
                height={60}
                width={60}
              />
        </div>
      )}

      {viewSleep && (
        <div className={utilStyles.wearicon}>
              <div>睡眠指数</div>
              <img
                src={displaySleepIcon(dailyWeather[0])?.iconlabel}
                height={60}
                width={60}
              />
        </div>
      )}

      {viewUmbrella && (
        <div className={utilStyles.wearicon}>
        <div>傘指数</div>
        <img
          src={displayUmbrellaIcon(dailyWeather)?.iconlabel}
          height={60}
          width={60}
        />
        </div>
      )}

      
        <div>
      <AddIvent
        addOpen={addOpen}
        handleClickClose={handleClickClose}
        sendInfo={sendInfo}
      />
      <div className={utilStyles.wear}>
        <button className="btn btn-primary" onClick={handleClickOpena}>日程を追加</button>
        <ul>
        { regiData?.map((value) => 
        <li>{value.spot}</li>
       )}
      </ul>
      </div> 

      

          </div>
        </div>
      </div>
    </Layout>
  );
}