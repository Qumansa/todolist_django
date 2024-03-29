import { Props } from './types';

import styles from './styles.module.css';

export const Spinner = ({ withModifier, withClassname }: Props) => (
	<div className={`${styles.wrapper} ${withClassname ? withClassname : ''}`}>
		<div
			className={`
				${styles.spinner} 
				${withModifier ? styles[withModifier] : ''}  
			`}></div>
	</div>
);
