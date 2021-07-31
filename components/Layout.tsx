import React from 'react';
import Head from 'next/head';
import styles from './layout.module.css';
import utilStyles from '@/styles/utils.module.css';
import Link from 'next/link';

const name = 'WEATHERP';
export const siteTitle = 'お天気パネル';

type Props = { home?: boolean };

const Layout: React.FC<Props> = ({ children, home }) => {
  return (
    <div className={styles.container}>
      <Head>
        <meta charSet="utf-8" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.9/css/weather-icons.min.css"
        />
        <link rel="stylesheet" href="style.css" />
        <meta name="description" content="weekly weather forecast" />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <img
              src="/images/rip_logo.jpg"
              className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <img
                  src="/images/rip_logo.jpg"
                  className={`${styles.headerImage} ${utilStyles.borderCircle}`}
                  alt={name}
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Layout;
