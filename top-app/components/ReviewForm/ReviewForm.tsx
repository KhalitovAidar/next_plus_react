import { ReviewFormProps } from './ReviewForm.props';
import styles from './ReviewForm.module.css';
import cn from 'classnames';
import { Input } from '../Input/Input';
import { Raiting } from '../Raiting/Raiting';
import { Textarea } from '../Textarea/Textarea';
import { Button } from '../Button/Button';
import CloseIcon from './close.svg';
import { IReviewForm } from './ReviewForm.interface';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ReviewForm = ({ productId, className, ...props }: ReviewFormProps): JSX.Element => {
	const { register, control, handleSubmit, formState: { errors } } = useForm<IReviewForm>();

	const onSubmit: SubmitHandler<IReviewForm> = (data: IReviewForm) => {
		console.log(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={cn(styles.reviewForm, className)}
				{...props}
			>
				<Input
					{...(register('name'), { required: true })}
					placeholder='Имя'
					error={errors.name}
				/>
				<Input {...register('title')} className={styles.title} placeholder='Заголовок' />
				<div className={styles.rating}>
					<span>Оценка:</span>
					<Controller
						control={control}
						name='rating'
						render={({ field }) => (
							<Raiting
								isEditable
								raiting={field.value}
								setRaiting={field.onChange}
								ref={field.ref}
							/>
						)}
					/>
				</div>
				<Textarea {...register('description')} className={styles.description} placeholder='Текст отзыва'></Textarea>
				<div className={styles.submit}>
					<Button appereance='primary'>Отправить</Button>
					<span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
				</div>
			</div>
			<div className={styles.success}>
				<div className={styles.successTitle}>Ваш отзыв отправлен!</div>
				<div>
					Спасибо, ваш отзыв будет опубликован после проверки!
				</div>
				<CloseIcon className={styles.close} />
			</div>
		</form>
	);
};