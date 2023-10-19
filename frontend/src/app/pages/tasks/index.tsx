import { AddForm } from './features/addForm';
import { FilterList } from './features/filterList';
import { Search } from './features/search';
import { ToDoList } from './features/toDoList';

import common from '@styles/common.module.css';
import styles from './styles.module.css';

export const Tasks = () => (
	<section className={`${common.section} ${common.container} ${common.container_withBackground} ${styles.container}`}>
		<h2 className={common.srOnly}>Tasks</h2>
		<div className={styles.wrapper}>
			<AddForm />
			<FilterList />
			<Search />
			<ToDoList />
		</div>
	</section>
);
