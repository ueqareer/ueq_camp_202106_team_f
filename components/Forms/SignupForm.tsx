import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useRouter } from 'next/router';
import { auth } from 'utils/firebase';
import { DialogContentText } from '@material-ui/core';

const SignupForm = (props: { opens: boolean; handleCloses: () => void }) => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      user && router.push('/temp_index');
    });
  }, []);

  const createUser = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      router.push('/temp_index');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Dialog
      open={props.opens}
      onClose={props.handleCloses}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">新規登録</DialogTitle>

      <DialogContent>
        <DialogContentText>
          <div>
            <form onSubmit={createUser}>
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
                <Button onClick={props.handleCloses} color="primary">
                  キャンセル
                </Button>
                <Button type="submit" color="primary">
                  サインアップ
                </Button>
              </DialogActions>
            </form>
          </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default SignupForm;
