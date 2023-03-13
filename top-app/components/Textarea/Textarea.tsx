import styles from './Textarea.module.css';
import cn from 'classnames';
import { TextareaProps } from './Textarea.props';
import { ForwardedRef, forwardRef } from 'react';

export const Textarea = forwardRef(({ className, ...props }: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
	return (
		<textarea className={cn(className, styles.input)} ref={ref} {...props}>

		</textarea>);
});