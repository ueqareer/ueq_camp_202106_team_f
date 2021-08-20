import React, { useEffect, useState, FC } from 'react';
import firebase from 'firebase/app';
import { firestore } from 'utils/firebase';

const backEnd = () => {
  const [currentUser, setCurrentUser] = useState<null | object>(null);

  let userCollectionSize;

  console.log('before getUserNumber', userCollectionSize);

  const backMain = async () => {
    const userNumber = await firestore
      .collection('users')
      .get()
      .then((snapshot) => {
        userCollectionSize = snapshot.size;
        console.log(userCollectionSize);
        return userCollectionSize;
      });
    console.log(userNumber);

    const userDocument: firebase.firestore.DocumentData[] = [];
    const userID = [];

    await firestore
      .collection('users')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          userDocument.push(doc.data());
        });
      });
    for (let i = 0; i < userNumber; i++) {
      userID[i] = userDocument[i].screen_name;
      console.log(userID[i], 'i = ', i);
    }

    const notifyDocument: firebase.firestore.DocumentData[] = [];
    const getNotify = await firestore
      .collection('users')
      .doc(userID[0])
      .collection('notification_data')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          notifyDocument.push(doc.data());
          console.log(doc.data());
        });
      });
    for (let i = 0; i < 4; i++) {
      console.log(userID[0], notifyDocument[i]);
    }
  };

  console.log(backMain());

  const test_userCollectionSize = firestore
    .collection('users')
    .get()
    .then()
    .then((snapshot) => {
      console.log(snapshot.size);
      return snapshot.size;
    });

  console.log(test_userCollectionSize);

  const getUsers = firestore
    .collection('users')
    .get()
    .then((snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return doc.data();
      });
      console.log(data);
    });

  return null;
};

// const backgroundMain = () => {
//   // const userCollectionSize = firestore
//   //   .collection('users')
//   //   .get()
//   //   .then((snapshot) => {
//   //     snapshot.size;
//   //   });
//   // console.log(userCollectionSize);
//   console.log('hello world');
//   return;
// };

export default backEnd;
function getUserNumber(): any {
  throw new Error('Function not implemented.');
}
