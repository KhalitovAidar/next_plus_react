import { Advantages, HhData, Htag, Product, Sort, Tag } from '../../components';
import { TopPageComponentProps } from './TopPageComponent.props';
import styles from './TopPageComponent.module.css';
import { TopLevelCategory } from '../../interfaces/page.interface';
import { SortEnum } from '../../components/Sort/Sort.props';
import { useEffect, useReducer } from 'react';
import { sortReducer } from './sort.reducer';
import { useScrollY } from '../../hooks/useScrollY';



export const TopPageComponent = ({ firstCategory, page, product }: TopPageComponentProps): JSX.Element => {
	const [{ products: sortedProducts, sort }, dispathSort] = useReducer(sortReducer, { products: product, sort: SortEnum.Raiting });
	const y = useScrollY();

	const setSort = (sort: SortEnum) => {
		dispathSort({ type: sort });
	};

	useEffect(() =>
		dispathSort({ type: 'reset', initialState: product })
		, [product]);

	return (
		<div className={styles.wrapper}>
			{y}
			<div className={styles.title}>
				<Htag tag="h1"> {page.title} </Htag>
				{product && <Tag size="m" color="gray">{product.length}</Tag>}
				<Sort sort={sort} setSort={setSort} />
			</div>
			{sortedProducts && sortedProducts.map(p => <Product layout key={p._id} product={p} />)}

			<div className={styles.hhTitle}>
				<Htag tag="h2"> Вакансии - {page.category}</Htag>
				<Tag size="m" color="red">hh.ru</Tag>
			</div>

			{firstCategory == TopLevelCategory.Courses && page.hh && <HhData {...page.hh} />}
			{page.advantages && page.advantages.length > 0 && <>
				<Htag tag='h2'>Преимущества</Htag>
				<Advantages advantages={page.advantages} />
			</>}
			{page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{ __html: page.seoText }} />}
			<Htag tag='h2'>Получаемые навыки</Htag>
			{page.tags.map(t => (
				<Tag key={t} color='primary' size='m' className={styles.seoTag}>{t}</Tag>
			))}
		</div>
	);
};