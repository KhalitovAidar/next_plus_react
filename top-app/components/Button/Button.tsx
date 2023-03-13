import { ButtonProps } from './Button.props';
import styles from './Button.module.css';
import ArrowIcon from './arrow.svg';
import cn from 'classnames';
import { motion, useMotionValue } from 'framer-motion';
import { useEffect } from 'react';

export const Button = ({ children, arrow = 'none', appereance, className, ...props }: ButtonProps): JSX.Element => {
	const scale = useMotionValue(1);

	useEffect(() => {
		scale.onChange(s => console.log(s));
	}, []);

	return (
		<motion.button
			whileHover={{ scale: 1.05 }}
			className={cn(styles.button, className, {
				[styles.primary]: appereance == 'primary',
				[styles.ghost]: appereance == 'ghost'
			})}
			style={{ scale }}
			{...props}
		>
			{children}
			{arrow != 'none' && <span className={cn(styles.arrow, {
				[styles.down]: arrow == 'down'
			})}>
				<ArrowIcon />
			</span>}
		</motion.button>
	);
};