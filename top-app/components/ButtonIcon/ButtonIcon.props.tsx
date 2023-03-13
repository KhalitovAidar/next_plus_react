import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import up from './stroke.svg';
import close from './closer.svg';
import menu from './menu.svg';

export const icons = {
	up,
	close,
	menu
};

export type IconName = keyof typeof icons;



export interface ButtonIconProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	icon: IconName,
	appereance: 'primary' | 'white'
}