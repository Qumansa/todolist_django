import global from '../../styles/global.module.css';
import styles from './styles.module.css';

export const Header = () => {
	return (
		<header className={styles.header}>
			<div className={global.container}>
				<h1 className={styles.header__title}>To-Do List</h1>
			</div>
		</header>
	);
};
