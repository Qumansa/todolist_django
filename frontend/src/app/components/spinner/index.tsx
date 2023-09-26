import { Props } from './types';

import styles from './styles.module.css';

export const Spinner = ({ withModifier }: Props) => (
	<div className={styles.spinnerWrapper}>
		<div
			className={`
				${styles.spinner} 
				${withModifier ? styles[withModifier] : ''}  
			`}></div>
	</div>
);
