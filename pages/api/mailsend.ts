import { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';
import firebase from 'firebase/app';
import { prefectures } from '@/components/japan';
import nodemailer from 'nodemailer';

const initializeApp = () =>
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    }),
  });

admin.apps.length ? admin.app() : initializeApp();
const firestore = admin.firestore();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //最初に日付データを取っておく
  const today = new Date();

  //userの数を取得
  const userNumber = await firestore
    .collection('users')
    .get()
    .then((snapshot) => {
      return snapshot.size;
    });

  //userDocument内にはそれぞれのユーザーごとの追加時間、ID(screen_name)とメアドが入っている
  const userDocument: firebase.firestore.DocumentData[] = [];
  const userID: string[] = [];

  //userID array have individual user document ID
  await firestore
    .collection('users')
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        userDocument.push(doc.data());
      });
    });

  console.log(userDocument);

  for (let i = 0; i < userNumber; i++) {
    //userDocument内のscreen_nameをuserIDへと代入
    userID[i] = userDocument[i].screen_name;
    console.log(userID[i], 'i = ', i);
  }

  const eachUserDocNum: number[] = [];

  //get each user's notification_data number
  for (let i = 0; i < userNumber; i++) {
    await firestore
      .collection('users')
      .doc(userID[i])
      .collection('notification_data')
      .get()
      .then((snapshot) => {
        eachUserDocNum[i] = snapshot.size;
      });
    console.log(
      userID[i],
      eachUserDocNum[i],
      typeof userID[i],
      typeof eachUserDocNum[i]
    );
  }
  console.log(eachUserDocNum);

  const notifyDocument: firebase.firestore.DocumentData[] = [];
  //notifyDocumentを二次元配列にするための初期化
  for (let i = 0; i < userNumber; i++) {
    notifyDocument[i] = [];
  }

  let temp_notifyDocument: firebase.firestore.DocumentData[] = [];
  //notifyDocumentにuserID[]をもとに、それぞれのユーザーの予定データを格納、doc_idはデータを削除する時に必要
  for (let i = 0; i < userNumber; i++) {
    await firestore
      .collection('users')
      .doc(userID[i])
      .collection('notification_data')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const data = doc.data();
          temp_notifyDocument.push({
            date: data.date,
            notified: data.notified,
            schedule: data.schedule,
            spot: data.spot,
            weather: data.weather,
            doc_id: doc.id,
          });
          // temp_notifyDOcument_id.push(doc.id);
        });
        console.log(temp_notifyDocument);
        // console.log(temp_notifyDOcument_id);
        for (let j = 0; j < eachUserDocNum[i]; j++) {
          notifyDocument[i][j] = temp_notifyDocument[j];
          // notifyDocument[i][j].push(temp_notifyDOcument_id[j]);
        }
        //再初期化
        temp_notifyDocument = [];
        // temp_notifyDOcument_id = [];
      });
  }

  console.log(notifyDocument);

  //check notifyDoc in console
  for (let i = 0; i < userNumber; i++) {
    for (let j = 0; j < eachUserDocNum[i]; j++) {
      console.log(userID[i], notifyDocument[i][j].date); //toDateすることで数字を日付へと変更している
    }
  }

  //ここまででnotifyDocument[i][j]のiとjを指定することでユーザーごとの登録データを取得できる
  //notifyDocument[0][0]はユーザー0の一つ目の予定データが取れる

  //データベース削除
  async function deleteDatabase(userid: string, docid: string) {
    await firestore
      .collection('users')
      .doc(userid)
      .collection('notification_data')
      .doc(docid)
      .delete()
      .then(() => {
        console.log('delete complete');
      })
      .catch((error) => {
        console.log('failed to delete', error, docid);
      });
  }

  //メール送信関数

  //送信のためのデータなどを取得するためのメイン関数
  function sendMain(
    mailaddress: string,
    day: number,
    weather: string,
    spot: string,
    date: string
  ) {
    const smtpData = {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'ueq2021teamf@gmail.com',
        pass: process.env.GMAIL_PW,
      },
    };
    const mailData = {
      from: '"weather管理"<' + smtpData.auth.user + '>',
      to: mailaddress,
      subject: '天気通知',
      text: day + '日後、' + date + 'の' + spot + 'の天気予報は' + weather,
      html: day + '日後、' + date + 'の' + spot + 'の天気予報は' + weather,
    };
    const transporter = nodemailer.createTransport(smtpData);

    transporter.sendMail(
      mailData,
      function (error, info: { response: string }) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent:' + info.response, mailData);
        }
      }
    );
  }

  //天気データ取得
  async function getWeatherData(spot: string, day: number) {
    const pref = prefectures.find((x) => x.pref == spot);
    const lat = pref?.lat;
    const lon = pref?.lon;
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&lang=ja&appid=40ce155d4d54e1376534f0dee7ea34f7`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.daily[day].weather[0].description);
    return data.daily[day].weather[0].description;
  }

  console.log('today = ', today, today.getTime());
  for (let i = 0; i < userNumber; i++) {
    for (let j = 0; j < eachUserDocNum[i]; j++) {
      const diff =
        (notifyDocument[i][j].schedule.toMillis() - today.getTime()) / 86400000;
      console.log(diff, notifyDocument[i][j].spot);
      if (diff <= 3 && diff > 2) {
        getWeatherData(notifyDocument[i][j].spot, 3);
        sendMain(
          userDocument[i].email,
          3,
          await getWeatherData(notifyDocument[i][j].spot, 3),
          notifyDocument[i][j].spot,
          notifyDocument[i][j].schedule.toDate()
        );
      } else if (diff <= 2 && diff > 1) {
        getWeatherData(notifyDocument[i][j].spot, 2);
        sendMain(
          userDocument[i].email,
          2,
          await getWeatherData(notifyDocument[i][j].spot, 2),
          notifyDocument[i][j].spot,
          notifyDocument[i][j].schedule.toDate()
        );
      } else if (diff <= 1 && diff > 0) {
        getWeatherData(notifyDocument[i][j].spot, 1);
        sendMain(
          userDocument[i].email,
          1,
          await getWeatherData(notifyDocument[i][j].spot, 1),
          notifyDocument[i][j].spot,
          notifyDocument[i][j].schedule.toDate()
        );
      } else if (diff <= 0) {
        deleteDatabase(userID[i], notifyDocument[i][j].doc_id);
      }
    }
  }

  res.status(200).json({ name: 'John Doe' });
}
