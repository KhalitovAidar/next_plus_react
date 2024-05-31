import axios, {AxiosError} from 'axios';
import {GetServerSidePropsContext, GetStaticPaths, GetStaticProps, GetStaticPropsContext} from 'next';
import React from 'react';
import { parseCookies } from 'nookies';
import { firstLevelMenu } from '../../helpers/helpers';
import { MenuItem } from '../../interfaces/menu.interface';
import { withLayout } from '../../layout/Layout';
import {ParsedUrlQuery} from "node:querystring";

function Type({ firstCategory }: TypeProps) {
	return (<>
		Type: {firstCategory}
	</>
	);
}

export default withLayout(Type);

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
	const { token } = parseCookies(context);

	if (!token) {
		return {
			redirect: {
				destination: '/auth',
				permanent: false,
			},
		};
	}

	const params = context.params;
	const firstCategoryItem = firstLevelMenu.find(m => m.route === params?.type);

	if (!firstCategoryItem) {
		return {
			notFound: true,
		};
	}

	try {
		// Отправляем запрос с токеном в заголовке
		const { data: menu } = await axios.post<MenuItem[]>('http://localhost:8080/api/courses/secondCourses', {
			firstCategory: firstCategoryItem.id
		}, {
			headers: { Authorization: `Bearer ${token}` }
		});

		return {
			props: {
				menu,
				firstCategory: firstCategoryItem.id,
			},
		};
	} catch (error) {
		// Если бэкенд отклоняет запрос с кодом 403, перенаправляем на страницу входа
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


// export const getStaticPaths: GetStaticPaths = async () => {
// 	return {
// 		paths: firstLevelMenu.map(m => "/" + m.route),
// 		fallback: true
// 	};
// };
//
// export const getStaticProps: GetStaticProps<TypeProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
// 	if (!params) {
// 		return {
// 			notFound: true
// 		};
// 	}
//
// 	const firstCategoryItem = firstLevelMenu.find(m => m.route == params.type);
// 	if (!firstCategoryItem) {
// 		return {
// 			notFound: true
// 		};
// 	}
// 	const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
// 		firstCategory: firstCategoryItem.id
// 	});
// 	return {
// 		props: {
// 			menu,
// 			firstCategory: firstCategoryItem.id
// 		}
// 	};
// };
//
interface TypeProps extends Record<string, unknown> {
	menu: MenuItem[],
	firstCategory: number
}