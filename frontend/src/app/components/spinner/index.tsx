import { SpinnerProps } from './types';

import styles from './styles.module.css';

export const Spinner = ({ withModifier }: SpinnerProps) => (
	<div className={styles.spinnerWrapper}>
		<div
			className={`
				${styles.spinner} 
				${withModifier ? styles[withModifier] : ''}  
			`}></div>
	</div>
);
