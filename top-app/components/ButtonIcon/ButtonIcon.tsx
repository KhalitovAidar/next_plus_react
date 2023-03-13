import { ButtonIconProps, icons } from './ButtonIcon.props';
import styles from './ButtonIcon.module.css';
import cn from 'classnames';

export const ButtonIcon = ({ icon, appereance, className, ...props }: ButtonIconProps): JSX.Element => {
	const IconComp = icons[icon];
	return (
		<button
			className={cn(styles.button, className, {
				[styles.primary]: appereance == 'primary',
				[styles.white]: appereance == 'white'
			})}
			{...props}
		>
			<IconComp />
		</button>
	);
};