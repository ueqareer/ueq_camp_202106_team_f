import React, { useEffect, FC, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import firebase from 'firebase/app';
import { auth, firestore } from 'utils/firebase';
import { /*AuthProvider, */ AuthContext } from '@/auth/AuthProvider';
import AddIvent from '@/components/Forms/AddIvent '
import utilStyles from '@/styles/utils.module.css';
//import { func } from 'prop-types';

type RegisterdData = {
  date: Date;
  notified: boolean;
  spot: string;
  weather: string;
  schedule: Date;
};

const Home: FC = () => {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();
  const [regiData, setRegiData] = useState<RegisterdData[]>();

  useEffect(() => {
    console.log('auth' + auth.onAuthStateChanged);
    console.log(currentUser);
    // user ? CurrentUser(user) : router.push('/login'); //条件 ? 値1 : 値2 で条件が真なら値1でそうでない場合値2
  }, []);

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

  console.log(regiData);

  const logOut = async () => {
    try {
      await auth.signOut();
      router.push('/login');
    } catch (error) {
      alert(error.message);
    }
  };

  const [value_spot, setValue_spot] = useState('新潟');
  const [value_schedule, setValue_schedule] = useState('');

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
  }

   const [addOpen, setAddOpen] = useState(false);

  const handleClickOpen = () => {
    setAddOpen(true);
  };

  const handleClickClose = () => {
    setAddOpen(false);
  };

  const handleClickOk = (viewWear: string, viewHot: string) => {
    //setValue_spot(viewWear);
    //setValue_schedule(viewHot);
    setAddOpen(false);
  };

  return (
    <div>
      <pre>{currentUser && JSON.stringify(currentUser, null, 4)}</pre>
      <AddIvent
        addOpen={addOpen}
        handleClickClose={handleClickClose}
        handleClickOk={handleClickOk}
        value_spot={value_spot}
        value_schedule={value_schedule}
        sendInfo={sendInfo}
      />
      <div className={utilStyles.wear}>
        <button onClick={handleClickOpen}>日程を追加</button>
      </div>
      <button onClick={getTest}>GetTest</button>
      <button onClick={sendTest}>SendTest</button>
      <button onClick={logOut}>Logout</button>
    </div>
  );
};

export default Home;
