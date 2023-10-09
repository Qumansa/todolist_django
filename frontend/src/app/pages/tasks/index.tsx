import { FilterList } from './features/filterList';
import { Form } from './features/form';
import { Search } from './features/search';
import { ToDoList } from './features/toDoList';

import common from '@common/common.module.css';
import styles from './styles.module.css';

export const Tasks = () => (
	<section className={`${common.section} ${common.container} ${common.container_withBackground} ${styles.container}`}>
		<h2 className={common.srOnly}>Tasks</h2>
		<div className={styles.wrapper}>
			<Form />
			<FilterList />
			<Search />
			<ToDoList />
		</div>
	</section>
);
