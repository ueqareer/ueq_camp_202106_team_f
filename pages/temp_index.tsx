import React, { useEffect, FC, useState } from 'react';
import { useRouter } from 'next/router';
import firebase from 'firebase/app';
import { auth, firestore } from 'utils/firebase';
import { func } from 'prop-types';

const Home: FC = (props: any) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<null | object>(null);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      console.log('auth' + auth.onAuthStateChanged);
      console.log(user);
      user ? setCurrentUser(user) : router.push('/login'); //条件 ? 値1 : 値2 で条件が真なら値1でそうでない場合値2
      //   !user.emailVerified && router.push('/sent');
    });
  }, []);

  function sendTest() {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);
      firestore
        .collection('users')
        .doc(user.uid)
        .collection('notification_data')
        .add({
          title: 'test',
          weather: 'sunny',
          notified: false,
          created_at: firebase.firestore.FieldValue.serverTimestamp(),
        });
    });
  }
  function getTest() {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);
      //   const getPosts = [];
      firestore
        .collection('users')
        .doc(user.uid)
        .collection('notification_data')
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            const data = doc.data();
            console.log('Document data', data);
          });
        });
    });
  }

  const logOut = async () => {
    try {
      await auth.signOut();
      router.push('/login');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <pre>{currentUser && JSON.stringify(currentUser, null, 4)}</pre>
      <button onClick={getTest}>GetTest</button>
      <button onClick={sendTest}>SendTest</button>
      <button onClick={logOut}>Logout</button>
    </div>
  );
};

export default Home;
