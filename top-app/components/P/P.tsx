import { PProps } from './P.props';
import styles from './P.module.css';
import cn from 'classnames';

export const P = ({ size, children, className, ...props }: PProps): JSX.Element => {

	return (<p
		className={cn(styles.p, className, {
			[styles.l]: size == 'l',
			[styles.m]: size == 'm',
			[styles.s]: size == 's'
		})}
		{...props}
	>
		{children}
	</p>);
};