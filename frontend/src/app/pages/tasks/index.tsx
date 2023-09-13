import { FilterList } from './features/filterList';
import { Form } from './features/form';
import { Search } from './features/search';
import { ToDoList } from './features/toDoList';

import global from '../../styles/global.module.css';
import styles from './styles.module.css';

export const Tasks = () => (
	<section className={`${global.section}`}>
		<div className={global.container}>
			<h2 className={global.srOnly}>Tasks</h2>
			<div className={styles.toDoList__wrapper}>
				<Form />
				<FilterList />
				<Search />
				<ToDoList />
			</div>
		</div>
	</section>
);
