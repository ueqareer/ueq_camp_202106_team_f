import React, { useEffect, useState, FC } from 'react';
import firebase from 'firebase/app';
import { firestore } from 'utils/firebase';
import { prefectures } from '@/components/japan';

const backEnd = () => {
  const backMain = async () => {
    //最初に日付データを取っておく
    const today = new Date();

    const userNumber = await firestore
      .collection('users')
      .get()
      .then((snapshot) => {
        return snapshot.size;
      });
    console.log(userNumber);

    //userDocument内にはそれぞれのユーザーごとの追加時間とID(screen_name)が入っている
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

    async function getWeatherData(spot: string) {
      const pref = prefectures.find((x) => x.pref == spot);
      const lat = pref?.lat;
      const lon = pref?.lon;
      console.log(lat);
      const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=40ce155d4d54e1376534f0dee7ea34f7`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data.daily[3].weather[0]);
    }

    console.log('today = ', today, today.getTime());
    for (let i = 0; i < userNumber; i++) {
      for (let j = 0; j < eachUserDocNum[i]; j++) {
        const diff =
          (notifyDocument[i][j].date.toMillis() - today.getTime()) / 86400000;
        console.log(diff, notifyDocument[i][j].spot);
        getWeatherData(notifyDocument[i][j].spot);
      }
    }
  };

  backMain();

  return null;
};

export default backEnd;
