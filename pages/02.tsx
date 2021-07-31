import React from 'react';
import Head from 'next/head';
import Layout, { siteTitle } from '@/components/Layout';
import utilStyles from '@/styles/utils.module.css';

export async function getAllAPI() {
  const APIURL =
    'https://api.openweathermap.org/data/2.5/onecall?lat=35.6518205&lon=139.5446124&lang=ja&units=metric&appid=f9794935a670f65e810fe0253ce78aa8';
  const response = await fetch(APIURL);
  const data = await response.json();
  console.log(data);
}
getAllAPI();

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

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

      <div className={utilStyles.placeForm}>
        <h3 className={utilStyles.placename}>場所(都道府県)</h3>
        <input className={utilStyles.wroteplace} type="submit" value="決定" />
      </div>

      <div className={utilStyles.main}>
        <div className={utilStyles.container1}>
          <h1>
            Weahter<span>.</span>
          </h1>
          <h2>毎日時の天気予報</h2>
        </div>
      </div>

      <div className={utilStyles.weather}>
        <div className={utilStyles.today}>
          <div className={utilStyles.weatherIcon}>
            <i className="wi wi-day-sunny" />
          </div>
          <div className={utilStyles.weatherDetail}>
            <div id="ctempid" className={utilStyles.currenTemperature}>
              22°
            </div>
            <div id="cweather">晴れ</div>
            <div className={utilStyles.temperature}>
              <span id="cmaxtem">27°</span>/<span id="cminem">15°</span>
            </div>
            <div className={utilStyles.rainyPercent}>5%</div>
          </div>
        </div>

        <ul className={utilStyles.week}>
          <li className={utilStyles.day}>
            <div id="week1" className={utilStyles.dayofTheweek}>
              SUN
            </div>
            <div className={utilStyles.weatherIcon}>
              <i className="wi wi-day-sunny" />
            </div>
            <div className={utilStyles.temperature}>
              <span>25°</span>/<span>21°</span>
            </div>
          </li>

          <li className={utilStyles.day}>
            <div id="week2" className={utilStyles.dayofTheweek}>
              MON
            </div>
            <div className={utilStyles.weatherIcon}>
              <i className="wi wi-cloud" />
            </div>
            <div className={utilStyles.temperature}>
              <span>22°</span>/<span>18°</span>
            </div>
          </li>

          <li className={utilStyles.day}>
            <div id="week2" className={utilStyles.dayofTheweek}>
              MON
            </div>
            <div className={utilStyles.weatherIcon}>
              <i className="wi wi-cloud" />
            </div>
            <div className={utilStyles.temperature}>
              <span>22°</span>/<span>18°</span>
            </div>
          </li>

          <li className={utilStyles.day}>
            <div id="week2" className={utilStyles.dayofTheweek}>
              MON
            </div>
            <div className={utilStyles.weatherIcon}>
              <i className="wi wi-cloud" />
            </div>
            <div className={utilStyles.temperature}>
              <span>22°</span>/<span>18°</span>
            </div>
          </li>

          <li className={utilStyles.day}>
            <div id="week2" className={utilStyles.dayofTheweek}>
              MON
            </div>
            <div className={utilStyles.weatherIcon}>
              <i className="wi wi-cloud" />
            </div>
            <div className={utilStyles.temperature}>
              <span>22°</span>/<span>18°</span>
            </div>
          </li>

          <li className={utilStyles.day}>
            <div id="week2" className={utilStyles.dayofTheweek}>
              MON
            </div>
            <div className={utilStyles.weatherIcon}>
              <i className="wi wi-cloud" />
            </div>
            <div className={utilStyles.temperature}>
              <span>22°</span>/<span>18°</span>
            </div>
          </li>
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