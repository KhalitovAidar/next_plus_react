import { ProductProps } from './Product.props';
import styles from './Product.module.css';
import { Card } from '../Card/Card';
import { Raiting } from '../Raiting/Raiting';
import { Tag } from '../Tag/Tag';
import { Button } from '../Button/Button';
import { devlOfNumber, priceRu } from '../../helpers/helpers';
import { Divider } from '../Divider/Divider';
import Image from 'next/image';
import cn from 'classnames';
import { ForwardedRef, forwardRef, useRef, useState } from 'react';
import { Review } from '../Review/Review';
import { ReviewForm } from '../ReviewForm/ReviewForm';
import { motion } from 'framer-motion';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Product = motion(forwardRef(({ product, className, ...props }: ProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
	const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
	const reviewRef = useRef<HTMLDivElement>(null);

	const variants = {
		hidden: {
			opacity: 0,
			height: 0,
			display: 'none'
		},
		visible: {
			opacity: 1,
			height: 'auto'
		}
	};

	const scrollToReview = () => {
		setIsReviewOpened(true);
		reviewRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
	};

	return (
		<div className={className} {...props}>
			<Card className={styles.product} ref={ref}>
				<div className={styles.logo}>
					<Image
						src={product.image}
						alt={product.title}
						width={70}
						height={70}
					/>
				</div>
				<div className={styles.title}>{product.title}</div>
				<div className={styles.price}>
					{priceRu(product.price)}
					{product.oldPrice && <Tag className={styles.oldPrice} size='s' color='green'>{priceRu(product.price - product.oldPrice)}</Tag>}
				</div>
				<div className={styles.credit}>
					{priceRu(product.credit)}/<span className={styles.month}>мес</span>
				</div>
				<div className={styles.raiting}><Raiting raiting={product.reviewAvg ?? product.initialRating}></Raiting></div>
				<div className={styles.tags}>{product.categories.map(c => <Tag key={c} className={styles.category} color='ghost' size='s'>{c}</Tag>)}</div>
				<div className={styles.priceTitle}>цена</div>
				<div className={styles.creditTitle}>кредит</div>
				<div className={styles.rateTitle}><a href='#ref' onClick={scrollToReview}>{product.reviewCount} {devlOfNumber(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}</a></div>
				<Divider className={styles.hr} />
				<div className={styles.description}>{product.description}</div>
				<div className={styles.feature}>
					{product.characteristics.map(c => (
						<div className={styles.characteristics} key={c.name}>
							<span className={styles.characteristicsName}>
								{c.name}
							</span>
							<span className={styles.characteristicsDots}>

							</span>
							<span className={styles.characteristicsValue}>
								{c.value}
							</span>
						</div>
					))}
				</div>
				<div className={styles.advBlock}>
					{product.advantages && <div className={styles.advantages}>
						<div className={styles.advTitle}>Преимущества</div>
						{product.advantages}
					</div>}
					{product.disadvantages && <div className={styles.disadvantages}>
						<div className={styles.advTitle}>Недостатки</div>
						{product.disadvantages}
					</div>}
				</div>
				<Divider className={styles.hr} />
				<div className={styles.actions}>
					<Button appereance='primary'>Узнать подробнее</Button>
					<Button
						appereance='ghost'
						arrow={isReviewOpened ? 'down' : 'right'}
						className={styles.reviewButton}
						onClick={() => setIsReviewOpened(!isReviewOpened)}
					>Читать отзывы</Button>
				</div>
			</Card>
			<motion.div
				ref={reviewRef}
				variants={variants}
				initial={'hidden'}
				animate={isReviewOpened ? 'visible' : 'hidden'}
			>
				<Card
					color='blue'
					className={cn(styles.reviews)}
					ref={ref}
				>
					{product.reviews.map(r => (
						<div key={r._id}>
							<Review review={r} />
							<Divider />
						</div>
					))}
					<ReviewForm productId={product._id} className={cn(styles.reviews)} />
				</Card>
			</motion.div>
		</div>
	);
}));