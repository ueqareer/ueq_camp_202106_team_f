import React, { useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import  { useRouter } from 'next/router';
import firebase from 'firebase/app';
import { auth, firestore } from 'utils/firebase';
import { DialogContentText } from '@material-ui/core';

const LoginForm = (props: { openl: boolean; handleClosel: () => void }) => {

const router = useRouter()
const [email, setEmail] = useState<string>('');
const [password, setPassword] = useState<string>('');

useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      user && router.push('/temp_index');
      console.log(user);

      if (user) {
        const userDoc = await firestore.collection('users').doc(user.uid).get();
        if (!userDoc.exists) {
          await userDoc.ref.set({
            screen_name: user.uid,
            display_name: 'test',
            created_at: firebase.firestore.FieldValue.serverTimestamp(),
          });
        }
      }
    });
  }, []);

  const logIn = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      router.push('/temp_index');
    } catch (err) {
      alert(err.message);
    }
  };
	
    return (
      <Dialog
        open={props.openl}
        onClose={props.handleClosel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">ログイン</DialogTitle>


        <DialogContent>
         <DialogContentText>
        <div>
          <form onSubmit={logIn}>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

         <DialogActions>
          <Button onClick={props.handleClosel} color="primary">
            キャンセル
          </Button>
	  <Button type = "submit" color="primary">
            ログイン
          </Button>
          
        </DialogActions>
        </form>
        </div>
         </DialogContentText>
        </DialogContent>


        
       
      </Dialog>
    );
  
}

export default LoginForm;
