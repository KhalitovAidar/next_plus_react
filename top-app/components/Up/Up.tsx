import styles from './Up.module.css';
import { motion, useAnimation } from 'framer-motion';
import { useScrollY } from '../../hooks/useScrollY';
import { useEffect } from 'react';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';

export const Up = (): JSX.Element => {
	const controls = useAnimation();
	const y = useScrollY();

	useEffect(() => {
		controls.start({ opacity: y / document.body.scrollHeight });
	}, [y, controls]);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	};
	return (
		<motion.div
			className={styles.up}
			animate={controls}
			initial={{ opacity: 0 }}
		>
			<ButtonIcon appereance='primary' icon='up' onClick={scrollToTop} />
		</motion.div>
	);
};