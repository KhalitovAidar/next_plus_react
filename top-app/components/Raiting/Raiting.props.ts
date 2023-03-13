import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface RaitingProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	isEditable?: boolean,
	raiting: number,
	setRaiting?: (raiting: number) => void,
}