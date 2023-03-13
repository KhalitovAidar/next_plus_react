import { useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef } from 'react';
import { RaitingProps } from './Raiting.props';
import StarIcon from './star.svg';
import cn from 'classnames';
import styles from './Raiting.module.css';

export const Raiting = forwardRef(({
	isEditable = false,
	raiting,
	setRaiting,
	...props
}: RaitingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
	const [raitingArray, setRaitingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

	useEffect(() => {
		constructRaiting(raiting);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [raiting]);

	const constructRaiting = (currentRaiting: number) => {
		const updatedArray = raitingArray.map((r: JSX.Element, i: number) => {
			return (
				<span
					className={cn(styles.star, {
						[styles.filled]: i < currentRaiting,
						[styles.editable]: isEditable
					})}
					onMouseEnter={() => changeDisplay(i + 1)}
					onMouseLeave={() => changeDisplay(raiting)}
					onClick={() => onClick(i + 1)}
					ref={ref}
				>
					<StarIcon
						tabIndex={isEditable ? 0 : -1}
						onKeyDown={(e: KeyboardEvent<SVGElement>) => isEditable && handleSpace(i + 1, e)}
					/>
				</span>
			);
		});
		setRaitingArray(updatedArray);
	};

	const handleSpace = (i: number, e: KeyboardEvent<SVGElement>) => {
		if (e.code != 'Space' || !setRaiting) {
			return;
		}
		setRaiting(i);
	};

	const changeDisplay = (i: number) => {
		if (!isEditable) {
			return;
		}
		constructRaiting(i);
	};

	const onClick = (i: number) => {
		if (!isEditable || !setRaiting) {
			return;
		}
		setRaiting(i);
	};

	return (
		<div {...props}>
			{raitingArray.map((r, i) => (<span key={i}>{r}</span>))}
		</div>);
});