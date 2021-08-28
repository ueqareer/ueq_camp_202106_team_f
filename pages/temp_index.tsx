import React, { useEffect, FC, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import firebase from 'firebase/app';
import { auth, firestore } from 'utils/firebase';
import { /*AuthProvider, */ AuthContext } from '@/auth/AuthProvider';
import AddIvent from '@/components/Forms/AddIvent ';
import utilStyles from '@/styles/utils.module.css';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { blue } from '@material-ui/core/colors';
//import { func } from 'prop-types';

type RegisterdData = {
  date: Date;
  notified: boolean;
  spot: string;
  weather: string;
  schedule: Date;
  doc_id: string;
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
  const value_test_spot = '神奈川県';
  const value_test_weather = 'sunny';
  const value_test_schedule = 'August 27, 2021';

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
              doc_id: doc.id,
            } as RegisterdData;
            // setPositionData(data);
            // console.log('Document data', data);
          });
          setRegiData(data);
        });
    }
  }

  const [docNumber, setDocNumber] = useState(0);

  const docNumber_func = async () => {
    await firestore
      .collection('users')
      .doc(currentUser?.uid)
      .collection('notification_data')
      .get()
      .then((snapshot) => {
        setDocNumber(snapshot.size);
        console.log(docNumber);
        return docNumber;
      });
  };

  console.log(docNumber_func());

  useEffect(() => {
    docNumber_func();
  }, []);

  if (regiData) {
    for (let i = 0; i < docNumber; i++) {
      console.log(regiData[i].spot);
      console.log(regiData[i].schedule);
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

  const handleClickOpen = () => {
    setAddOpen(true);
  };

  const handleClickClose = () => {
    setAddOpen(false);
  };

  return (
    <div className={utilStyles.container}>
      {/*<pre>{currentUser && JSON.stringify(currentUser, null, 4)}</pre>*/}
      <AddIvent
        addOpen={addOpen}
        handleClickClose={handleClickClose}
        //value_spot={value_spot}
        //value_schedule={value_schedule}
        sendInfo={sendInfo}
      />
      <div className={utilStyles.wear}>
        <Button
          style={{
            borderRadius: 50,
            minWidth: 50,
            width: 50,
            height: 50,
            position: 'fixed',
            /*
          bottom: 70,
          right: 30,
          */
          }}
          className="z-depth-1 p-2 d-flex justify-content-center align-items-center"
          onClick={handleClickOpen}
        >
          <AddIcon
            style={{ fontSize: 28, color: blue[500] }}
            className="text-primary"
          />
        </Button>
      </div>
      <button onClick={getTest}>GetTest</button>
      <button onClick={sendTest}>SendTest</button>
      <button onClick={logOut}>Logout</button>
    </div>
  );
};

export default Home;
