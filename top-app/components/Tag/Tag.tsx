import styles from './Tag.module.css';
import cn from 'classnames';
import { TagProps } from './Tag.props';

export const Tag = ({ size, children, color = 'ghost', href, className, ...props }: TagProps): JSX.Element => {

	return (<div
		className={cn(styles.tag, className, {
			[styles.m]: size == 'm',
			[styles.s]: size == 's',
			[styles.ghost]: color == 'ghost',
			[styles.red]: color == 'red',
			[styles.green]: color == 'green',
			[styles.gray]: color == 'gray',
			[styles.primary]: color == 'primary',
		})}
		{...props}
	>
		{href ? <a href={href}>{children}</a> : <>{children}</>}
	</div>);
};