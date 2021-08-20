import React, { useEffect, useState, FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import firebase from 'firebase';
import { auth, firestore } from 'utils/firebase';

const sendTest: FC = () => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<null | object>(null);
};

export default sendTest;
