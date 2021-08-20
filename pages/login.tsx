import React, { useEffect, useState, FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import firebase from 'firebase/app';
import { auth, firestore } from 'utils/firebase';

const Login: FC = () => {
  const router = useRouter();
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
        <button type="submit">Login</button>
      </form>
      <div>
        <Link href="/signup">
          <a>signup</a>
        </Link>
      </div>
      <div>
        <Link href="/">
          <a>home</a>
        </Link>
      </div>
    </div>
  );
};

export default Login;
