import {
	GetServerSideProps,
	GetServerSidePropsContext, GetStaticPaths, GetStaticProps, GetStaticPropsContext,
} from 'next';
import { withLayout } from '../../layout/Layout';
import axios, {AxiosError} from 'axios';
import { MenuItem } from '../../interfaces/menu.interface';
import { TopLevelCategory, TopPageModel } from '../../interfaces/page.interface';
import { ProductModel } from '../../interfaces/product.interface';
import { firstLevelMenu } from '../../helpers/helpers';
import { TopPageComponent } from '../../page-components';
import Head from 'next/head';
import {parseCookies} from "nookies";
import {ParsedUrlQuery} from "node:querystring";


function TopPage({ firstCategory, page, product }: TopPageProps) {
	return (
		<>
			<Head>
				<title>{page.metaTitle}</title>
				<meta name='description' content={page.metaDescription}></meta>
				<meta name='og:title' content={page.metaTitle}></meta>
				<meta name='og:description' content={page.metaDescription}></meta>
				<meta property="og:type" content="article" />
			</Head>
			<TopPageComponent
				firstCategory={firstCategory}
				page={page}
				product={product}
			/>
		</>
	);
}

export default withLayout(TopPage);

export const getServerSideProps: GetServerSideProps<TopPageProps> = async (context: GetServerSidePropsContext) => {
	const { params } = context;
	const { token } = parseCookies(context);

	if (!token) {
		return {
			redirect: {
				destination: '/auth',
				permanent: false,
			},
		};
	}

	if (!params) {
		return {
			notFound: true
		};
	}

	const firstCategoryItem = firstLevelMenu.find(m => m.route === params.type);

	if (!firstCategoryItem) {
		return {
			notFound: true
		};
	}

	try {
		// Отправляем запросы с токеном в заголовке
		const { data: menu } = await axios.post<MenuItem[]>('http://localhost:8080/api/courses/secondCourses', {
			firstCategory: firstCategoryItem.id
		}, {
			headers: { Authorization: `Bearer ${token}` }
		});

		if (menu.length === 0) {
			return {
				notFound: true
			};
		}

		const { data: page } = await axios.get<TopPageModel>(`http://localhost:8080/api/courses/course/${params.alias}`, {
			headers: { Authorization: `Bearer ${token}` }
		});

		const { data: product } = await axios.post<ProductModel[]>('http://localhost:8080/api/courses/product', {
			category: page.category,
			limit: 60
		}, {
			headers: { Authorization: `Bearer ${token}` }
		});
		console.log();

		return {
			props: {
				menu,
				firstCategory: firstCategoryItem.id,
				page,
				product
			}
		};
	} catch (error) {
		// Если бэкенд отклоняет запрос с кодом 403, перенаправляем на страницу входа
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError;
			if (axiosError.response && axiosError.response.status === 403) {
				return {
					redirect: {
						destination: '/auth',
						permanent: false,
					},
				};
			}
		}

		console.error('Ошибка при получении данных:', error);
		return {
			notFound: true
		};}
};

// export const getStaticPaths: GetStaticPaths = async () => {
// 	let paths: string[] = [];
// 	for (const m of firstLevelMenu) {
// 		const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
// 			firstCategory: m.id
// 		});
// 		paths = paths.concat(menu.flatMap(s => s.pages.map(p => `/${m.route}/${p.alias}`)));
// 	}
// 	console.log(paths);
//
// 	return {
// 		paths,
// 		fallback: false
// 	};
// };
//
// export const getStaticProps: GetStaticProps<TopPageProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
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
// 	try {
// 		const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
// 			firstCategory: firstCategoryItem.id
// 		});
//
// 		if (menu.length == 0) {
// 			return {
// 				notFound: true
// 			};
// 		}
//
// 		const { data: page } = await axios.get<TopPageModel>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/byAlias/' + params.alias);
// 		const { data: product } = await axios.post<ProductModel[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/product/find', {
// 			category: page.category,
// 			limit: 60
// 		});
// 		return {
// 			props: {
// 				menu,
// 				firstCategory: firstCategoryItem.id,
// 				page,
// 				product
// 			},
// 			revalidate: 10
// 		};
// 	} catch {
// 		return {
// 			notFound: true
// 		};
// 	}
// };
//
interface TopPageProps extends Record<string, unknown> {
	menu: MenuItem[],
	firstCategory: TopLevelCategory,
	page: TopPageModel,
	product: ProductModel[]
}
