import React, { useEffect, FC, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import firebase from 'firebase/app';
import { auth, firestore } from 'utils/firebase';
import { AuthProvider, AuthContext } from '@/auth/AuthProvider';
import { func } from 'prop-types';

type PositionData = {
  date: Date;
  notified: boolean;
  spot: string;
  weather: string;
};

const Home: FC = (props: any) => {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();
  const [positionData, setPositionData] = useState<PositionData[]>();

  useEffect(() => {
    console.log('auth' + auth.onAuthStateChanged);
    console.log(currentUser);
    // user ? CurrentUser(user) : router.push('/login'); //条件 ? 値1 : 値2 で条件が真なら値1でそうでない場合値2
    //   !user.emailVerified && router.push('/sent');
  }, []);

  function sendTest() {
    if (currentUser) {
      console.log(currentUser);
      firestore
        .collection('users')
        .doc(currentUser.uid)
        .collection('notification_data')
        .add({
          spot: '東京',
          weather: 'sunny',
          notified: false,
          date: firebase.firestore.FieldValue.serverTimestamp(),
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
              date: doc.data().date.toDate(), //doc.data().date?.toDate()にするとdateがあるときだけtoDateを実行できる
            } as PositionData;
            // setPositionData(data);
            // console.log('Document data', data);
          });
          setPositionData(data);
        });
    }
  }

  console.log(positionData);

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
