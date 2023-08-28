import styles from './styles.module.css';

export const Spinner = () => {
	return (
		<div className={styles.spinnerWrapper}>
			<div className={styles.spinner}></div>
		</div>
	);
};
