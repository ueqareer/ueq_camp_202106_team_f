import React, { useEffect, FC, useState } from 'react';
import { useRouter } from 'next/router';

import { auth } from 'utils/firebase';

const Home: FC = (props: any) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<null | object>(null);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      user ? setCurrentUser(user) : router.push('/login'); //条件 ? 値1 : 値2 で条件が真なら値1でそうでない場合値2
      //   !user.emailVerified && router.push('/sent');
    });
  }, []);

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
      <button onClick={logOut}>Logout</button>
    </div>
  );
};

export default Home;
