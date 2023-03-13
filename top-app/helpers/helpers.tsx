import CoursesIcon from './icons/courses.svg';
import BookIcon from './icons/books.svg';
import ProductIcon from './icons/products.svg';
import ServicesIcon from './icons/services.svg';
import { TopLevelCategory } from '../interfaces/page.interface';
import { FirstLevelMenuItem } from '../interfaces/menu.interface';


export const firstLevelMenu: FirstLevelMenuItem[] = [
	{ route: 'courses', name: 'Курсы', icon: <CoursesIcon />, id: TopLevelCategory.Courses },
	{ route: 'services', name: 'Сервисы', icon: <ServicesIcon />, id: TopLevelCategory.Services },
	{ route: 'books', name: 'Книги', icon: <BookIcon />, id: TopLevelCategory.Books },
	{ route: 'products', name: 'Продукты', icon: <ProductIcon />, id: TopLevelCategory.Products }
];

export const priceRu = (price: number) =>
	price.toString().replace(/\B(?=(\d{3})+(?!(\d)))/g, ' ').concat(' ₽');

export const devlOfNumber = (number: number, titles: [string, string, string]) => {
	const cases = [2, 0, 1, 1, 1, 2];
	return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};