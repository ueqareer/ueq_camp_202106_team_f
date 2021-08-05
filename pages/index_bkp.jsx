import React from 'react';
import Head from 'next/head';
import Layout, { siteTitle } from '@/components/Layout';
import utilStyles from '@/styles/utils.module.css';
import Japanmap from '@/components/japan';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataset: {},
      temp0: 0,
      weather0: '',
      clouds0: 0,
      snow0: 0,
      rain0: 0,
      weatherIcon0: '',
      cmaxtem0: 0,
      cmintem0: 0,
      temp1: 0,
      weather1: '',
      clouds1: 0,
      snow1: 0,
      rain1: 0,
      weatherIcon1: '',
      cmaxtem1: 0,
      cmintem1: 0,
      temp2: 0,
      weather2: '',
      clouds2: 0,
      snow2: 0,
      rain2: 0,
      weatherIcon2: '',
      cmaxtem2: 0,
      cmintem2: 0,
      temp3: 0,
      weather3: '',
      clouds3: 0,
      snow3: 0,
      rain3: 0,
      weatherIcon3: '',
      cmaxtem3: 0,
      cmintem3: 0,
      temp4: 0,
      weather4: '',
      clouds4: 0,
      snow4: 0,
      rain4: 0,
      weatherIcon4: '',
      cmaxtem4: 0,
      cmintem4: 0,
      temp5: 0,
      weather5: '',
      clouds5: 0,
      snow5: 0,
      rain5: 0,
      weatherIcon5: '',
      cmaxtem5: 0,
      cmintem5: 0,
      temp6: 0,
      weather6: '',
      clouds6: 0,
      snow6: 0,
      rain6: 0,
      weatherIcon6: '',
      cmaxtem6: 0,
      cmintem6: 0,
      loading: false,
      lat: 35.6518205,
      lon: 139.5446124,
      day: [],
      day1: '',
      day2: '',
      day3: '',
      day4: '',
      day5: '',
      day6: '',
      today: '',
    };
  }

  componentDidMount() {
    (async () => {
      const APIURL =
        'https://api.openweathermap.org/data/2.5/onecall?lat=' +
        this.state.lat +
        '&lon=' +
        this.state.lon +
        '&units=metric&appid=f9794935a670f65e810fe0253ce78aa8';
      const response = await fetch(APIURL);
      const data = await response.json();
      this.setState({ dataset: data });
      console.log(data);
      this.TodayWeather();
      this.getDay();
    })();
  }

  getDay = () => {
    const day = this.state.day;
    var date = new Date();
    var week = ['SUN', 'MON', 'TRU', 'WED', 'THU', 'FRI', 'SAT'];
    this.setState({ today: week[date.getDay()] });
    for (let i = 0; i < 6; i++) {
      day.push(week[(date.getDay() + i + 1) % 7]);
    }
    this.setState({ day1: this.state.day[0] });
    this.setState({ day2: this.state.day[1] });
    this.setState({ day3: this.state.day[2] });
    this.setState({ day4: this.state.day[3] });
    this.setState({ day5: this.state.day[4] });
    this.setState({ day6: this.state.day[5] });

    console.log(this.state.today);
    console.log(this.state.day[0]);
  };

  TodayWeather = () => {
    const inttemp = Math.round(this.state.dataset.current.temp);
    this.setState({ temp0: inttemp });
    const maxtemp = Math.round(this.state.dataset.daily[0].temp.max);
    this.setState({ cmaxtem0: maxtemp });
    const mintemp = Math.round(this.state.dataset.daily[0].temp.min);
    this.setState({ cmintem0: mintemp });

    this.setState({
      rain0: '降水確率:' + this.state.dataset.hourly[0].pop + '%',
    });

    switch (true) {
      case 'Clouds' == this.state.dataset.current.weather[0].main:
        this.setState({ clouds0: this.state.dataset.current.clouds });
        this.setState({ weather0: '曇り　' + this.state.clouds0 + '%' });
        this.setState({ weatherIcon0: 'wi wi-cloud' });
        break;
      case 'Clear' == this.state.dataset.current.weather[0].main:
        this.setState({ weather0: '快晴' });
        this.setState({ weatherIcon0: 'wi wi-day-sunny' });
        break;
      case 'Snow' == this.state.dataset.current.weather[0].main:
        this.setState({ snow0: this.state.dataset.current.current.snow });
        this.setState({ weather0: '雪　降雪量' + this.state.snow0 + 'mm/h' });
        this.setState({ weatherIcon0: 'wi wi-snow' });
        break;
      case 'Rain' == this.state.dataset.current.weather[0].main:
        this.setState({ weather0: '雨' });
        this.setState({ weatherIcon0: 'wi wi-rain' });
        break;
      case 'Drizzle' == this.state.dataset.current.weather[0].main:
        this.setState({ weather0: '霧雨' });
        this.setState({ weatherIcon0: 'wi wi-sleet' });
        break;
      case 'Thunderstorm' == this.state.dataset.current.weather[0].main:
        this.setState({ weather0: '雷雨' });
        this.setState({ weatherIcon0: 'wi wi-thunderstorm' });
        break;
      default:
        this.setState({
          weather0: this.state.dataset.current.weather[0].description,
        });
        this.setState({ weatherIcon0: 'wi wi-dust' });
        break;
    }
  };

  OtherDayWeather = () => {
    for (let i = 1; i < 7; i++) {
      const maxtemp = Math.round(this.state.dataset.daily[i].temp.max);
      this.setState({ cmaxtem: maxtemp });
      const mintemp = Math.round(this.state.dataset.daily[i].temp.min);
      this.setState({ cmintem0: mintemp });

      this.setState({
        rain0: '降水確率:' + this.state.dataset.hourly[0].pop + '%',
      });

      switch (true) {
        case 'Clouds' == this.state.dataset.current.weather[0].main:
          this.setState({ clouds0: this.state.dataset.current.clouds });
          this.setState({ weather0: '曇り　' + this.state.clouds0 + '%' });
          this.setState({ weatherIcon0: 'wi wi-cloud' });
          break;
        case 'Clear' == this.state.dataset.current.weather[0].main:
          this.setState({ weather0: '快晴' });
          this.setState({ weatherIcon0: 'wi wi-day-sunny' });
          break;
        case 'Snow' == this.state.dataset.current.weather[0].main:
          this.setState({ snow0: this.state.dataset.current.current.snow });
          this.setState({ weather0: '雪　降雪量' + this.state.snow0 + 'mm/h' });
          this.setState({ weatherIcon0: 'wi wi-snow' });
          break;
        case 'Rain' == this.state.dataset.current.weather[0].main:
          this.setState({ weather0: '雨' });
          this.setState({ weatherIcon0: 'wi wi-rain' });
          break;
        case 'Drizzle' == this.state.dataset.current.weather[0].main:
          this.setState({ weather0: '霧雨' });
          this.setState({ weatherIcon0: 'wi wi-sleet' });
          break;
        case 'Thunderstorm' == this.state.dataset.current.weather[0].main:
          this.setState({ weather0: '雷雨' });
          this.setState({ weatherIcon0: 'wi wi-thunderstorm' });
          break;
        default:
          this.setState({
            weather0: this.state.dataset.current.weather[0].description,
          });
          this.setState({ weatherIcon0: 'wi wi-dust' });
          break;
      }
    }
  };

  render() {
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

        <div className={utilStyles.main}>
          <div className={utilStyles.container1}>
            <h1>
              Weahter<span>.</span>
            </h1>
            <h2>毎日時の天気予報</h2>
          </div>
        </div>

        <Japanmap />

        <div className={utilStyles.weather}>
          <div className={utilStyles.today}>
            {this.state.today}
            <div className={utilStyles.weatherIcon}>
              <i className={this.state.weatherIcon0} />
            </div>
            <div className={utilStyles.weatherDetail}>
              <div id="ctempid" className={utilStyles.currenTemperature}>
                {this.state.temp0}°
              </div>
              <div id="cweather">{this.state.weather0}</div>
              <div className={utilStyles.temperature}>
                <span id="cmaxtem">{this.state.cmaxtem0}°</span>/
                <span id="cminem">{this.state.cmintem0}°</span>
              </div>
              <div className={utilStyles.rainyPercent}>{this.state.rain0}</div>
            </div>
          </div>

          <ul className={utilStyles.week}>
            <li className={utilStyles.day}>
              <div id="week1" className={utilStyles.dayofTheweek}>
                {this.state.day1}
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
                {this.state.day2}
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
                {this.state.day3}
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
                {this.state.day4}
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
                {this.state.day5}
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
                {this.state.day6}
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
}

// document.getElementById('ctempid').textContent=
//   Math.round(res.current.temp) + '℃';
// document.getElementById('cweather').textContent =
//   res.current.weather[0].description;
// //var cweatherword = document.getElementById("cweather").textContent;
// //if(res.current.weather.weather(0).main==Cloud) cweatherword="曇り";
// document.getElementById('cmaxtem').textContent = Math.round(
//   res.daily[0].temp.max
// );
// document.getElementById('cmintem').textContent = Math.round(
//   res.daily[0].temp.min
// );
// document.getElementById('humidity').textContent = res.current.humidity;
