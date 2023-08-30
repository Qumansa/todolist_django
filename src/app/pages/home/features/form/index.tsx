import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useCreateToDoItemMutation } from '../../../../redux/slices/api';

import global from '../../../../styles/global.module.css';
import styles from './styles.module.css';

export const Form = () => {
	const [task, setTask] = useState('');
	const [createToDoItem] = useCreateToDoItemMutation();

	const onSubmitHandler = (e: React.FormEvent) => {
		e.preventDefault();

		createToDoItem({
			id: uuidv4(),
			description: task,
			favourite: false,
		});

		setTask('');
	};

	return (
		<form
			className={styles.form}
			onSubmit={onSubmitHandler}>
			<input
				className={global.input}
				type="text"
				name="task-name"
				value={task}
				placeholder="Type in a new task"
				onChange={(e) => setTask(e.target.value)}
			/>
			<button
				className={`${global.button} ${global.button_lightSteelBlue}`}
				type="submit">
				Add
			</button>
		</form>
	);
};
