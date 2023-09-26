import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useCreateToDoItemMutation } from '../../../../redux/slices/api';

import { ErrorMessage } from '../../../../components/errorMessage';
import { Spinner } from '../../../../components/spinner';

import global from '../../../../styles/global.module.css';
import styles from './styles.module.css';

export const Form = () => {
	const [createToDoItem, { isLoading, isError, isSuccess }] = useCreateToDoItemMutation();
	const [toDoItemDescription, setToDoItemDescription] = useState('');
	const [isShortDescription, setIsShortDescription] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	// исправить тип
	const timerRef = useRef<any | undefined>(undefined);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (isVisible) return;

		if (toDoItemDescription.length === 0) {
			setIsShortDescription(true);
		} else {
			await createToDoItem({
				id: uuidv4(),
				description: toDoItemDescription,
				favourite: false,
			});

			setIsShortDescription(false);
		}

		setIsVisible(true);
		setToDoItemDescription('');
	};

	useEffect(() => {
		if (!isVisible) return;

		timerRef.current = setTimeout(() => {
			setIsVisible(false);
		}, 3500);

		return () => clearTimeout(timerRef.current);
	}, [isVisible]);

	return (
		<form
			className={styles.form}
			onSubmit={handleSubmit}>
			<div className={styles.inputWrapper}>
				<input
					className={`${global.input} ${global.input_width100}`}
					type="text"
					name="to-do-item-name"
					value={toDoItemDescription}
					placeholder="Type in a new task"
					onChange={(e) => setToDoItemDescription(e.target.value)}
					minLength={1}
					maxLength={255}
				/>
				{isLoading && <Spinner withModifier="spinner_small" />}
				{isVisible && isError && <ErrorMessage withClassname={styles.result} />}
				{isVisible && isShortDescription && (
					<ErrorMessage
						message="The description is too short!"
						withClassname={styles.result}
					/>
				)}
				{isVisible && isSuccess && <span className={styles.result}>The task is successfully saved!</span>}
			</div>
			<button className={`${global.button} ${global.button_lightSteelBlue}`}>Add</button>
		</form>
	);
};
