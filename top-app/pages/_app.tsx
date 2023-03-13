import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import '../styles/globals.css';
import ym, { YMInitializer } from 'react-yandex-metrika';

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {

	return <>
		<Head>
			<title>MyTop - the best top</title>
			<link rel="preconnect" href="https://fonts.googleapis.com" />
			<link rel="preconnect" href="https://fonts.gstatic.com" />
			<link rel="preconnect" href="https://mc.yandex.ru" />
			<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;700&display=swap" rel="stylesheet" />
			<meta property="og:url" content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath} />
			<meta property="og:locale" content="ru_RU" />
		</Head>
		<YMInitializer
			accounts={[]}
			options={{ webvisor: true, defer: true }}
			version="2"
		/>
		<Component {...pageProps} />
	</>;
}

export default MyApp;
