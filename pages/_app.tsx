import React from 'react';
import { AppProps } from 'next/app';

import { AuthProvider } from '@/auth/AuthProvider';
import '@/styles/map.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
