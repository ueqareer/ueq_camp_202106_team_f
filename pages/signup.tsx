import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import firebase from 'firebase/app';
import { auth, firestore } from 'utils/firebase';

const SignUp: FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      user && router.push('/');
    });
  }, []);

  const createUser = async (e) => {
    e.preventDefault();
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      router.push('/login');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
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
        <button type="submit">SignUp</button>
      </form>
      <Link href="/login">
        <a>Login</a>
      </Link>
    </div>
  );
};

export default SignUp;
