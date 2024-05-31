import {GetServerSidePropsContext, GetStaticProps} from 'next';
import React, { useState } from 'react';
import { Htag, Button, P, Tag, Raiting, Input, Textarea } from '../components';
import { withLayout } from '../layout/Layout';
import axios, {AxiosError} from 'axios';
import { MenuItem } from '../interfaces/menu.interface';
import {parseCookies} from "nookies";
import {firstLevelMenu} from "../helpers/helpers";

function Home() {
	const [rating, setRaiting] = useState<number>(0);

	return (<>
		<Htag tag="h1">lol</Htag>
		<Htag tag="h2">lol</Htag>
		<Htag tag="h3">lol</Htag>
		<Button appereance='primary'
			className='myButtonClass'
			arrow='right'> lol </Button>
		<Button appereance='ghost' arrow="down"> lol </Button>
		<P size='l'> Big </P>
		<P size='m'> Medium </P>
		<P size='s'> Small </P>
		<Tag size='s'> smallTag </Tag>
		<Tag size='m' color='gray'> mediumTag </Tag>
		<Tag size='m' color='green'> mediumTag </Tag>
		<Tag size='m' color='red'> mediumTag </Tag>
		<Tag size='m' color='primary'> mediumTag </Tag>
		<Tag size='m'
			color='primary'
			href='https://www.google.com/'> mediumTag with link </Tag>
		<Raiting raiting={rating} isEditable={true} setRaiting={setRaiting} />
		<Input placeholder='lol' />
		<Textarea placeholder='test'></Textarea>
	</>

	);
}

export default withLayout(Home);

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
	const { token } = parseCookies(context);
	console.log("aaaaa")

	if (!token) {
		return {
			redirect: {
				destination: '/auth',
				permanent: false,
			},
		};
	}

	try {
		const firstCategory = 0;
		// Отправляем запрос с токеном в заголовке
		const { data: menu } = await axios.post<MenuItem[]>('http://localhost:8080/api/courses/secondCourses', {
			firstCategory: firstCategory
		}, {
			headers: { Authorization: `Bearer ${token}` }
		});

		return {
			props: {
				menu,
				firstCategory
			},
		};
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError;
			if (axiosError.response && axiosError.response.status === 403) {
				return {
					redirect: {
						destination: '/login.tsx',
						permanent: false,
					},
				};
			}
		}

		// Обработка других ошибок
		console.error('Ошибка при получении данных:', error);
		return {
			notFound: true,
		};
	}
};

// export const getStaticProps: GetStaticProps<HomeProps> = async () => {
// 	const firstCategory = 0;
// 	const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
// 		firstCategory
// 	});
// 	return {
// 		props: {
// 			menu,
// 			firstCategory
// 		}
// 	};
// };

interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[],
	firstCategory: number
}
