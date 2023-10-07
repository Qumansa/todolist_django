import { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useSetIsVisibleToFalseAfterDelay } from '@common/hooks/useSetIsVisibleToFalseAfterDelay';
import { useCreateToDoItemMutation } from '@redux/slices/api';

import { ErrorMessage } from '@components/errorMessage';
import { Spinner } from '@components/spinner';

import { Timer } from '@common/types';

import common from '@common/common.module.css';
import styles from './styles.module.css';

export const Form = () => {
	const [createToDoItem, { isLoading, isError, isSuccess }] = useCreateToDoItemMutation();
	const [toDoItemDescription, setToDoItemDescription] = useState('');
	const [isShortDescription, setIsShortDescription] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const timerRef = useRef<Timer>(null);

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

	useSetIsVisibleToFalseAfterDelay({ isVisible, setIsVisible, timerRef, timerDuration: 3500 });

	return (
		<form
			className={styles.form}
			onSubmit={handleSubmit}>
			<div className={styles.inputWrapper}>
				<input
					className={`${common.input} ${common.input_width100}`}
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
			<button className={`${common.button} ${common.button_lightSteelBlue}`}>Add</button>
		</form>
	);
};
