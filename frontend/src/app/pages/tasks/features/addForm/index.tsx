import { Form, Formik } from 'formik';
import { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';

import { useSetIsVisibleToFalseAfterDelay } from '@hooks/useSetIsVisibleToFalseAfterDelay';
import { useCreateToDoItemMutation } from '@redux/slices/api';

import { ErrorMessage } from '@components/errorMessage';
import { Input } from '@components/input';
import { Spinner } from '@components/spinner';

import { Timer } from '@types';
import { addTaskData } from './types';

import common from '@styles/common.module.css';
import styles from './styles.module.css';

export const AddForm = () => {
	const [createToDoItem, { isLoading, isError, isSuccess }] = useCreateToDoItemMutation();
	const [isVisible, setIsVisible] = useState(false);
	const timerRef = useRef<Timer>(null);

	const handleSubmit = ({ description }: addTaskData, resetForm: () => void) => {
		if (isVisible) return;

		createToDoItem({
			id: uuidv4(),
			description: description,
			favourite: false,
		})
			.unwrap()
			.then(() => {
				resetForm();
			})
			.finally(() => {
				setIsVisible(true);
			});
	};

	useSetIsVisibleToFalseAfterDelay({ isVisible, setIsVisible, timerRef, timerDuration: 3500 });

	return (
		<Formik
			initialValues={{
				description: '',
			}}
			validationSchema={Yup.object({
				description: Yup.string()
					.trim()
					.min(1, 'The length of the task must be from 1 to 255 characters.')
					.max(255, 'The length of the task must be from 1 to 255 characters.')
					.required('This field is required.'),
			})}
			validateOnBlur={false}
			onSubmit={(addTaskData, { resetForm }) => handleSubmit(addTaskData, resetForm)}>
			<Form className={styles.form}>
				<div className={styles.inputWrapper}>
					<Input
						label="Type in a new task"
						name="description"
						type="text"
						placeholder="Do the groceries"
					/>
					{isLoading && <Spinner withModifier="spinner_small" />}
					{isVisible && isError && <ErrorMessage withClassname={styles.result} />}
					{isVisible && isSuccess && <span className={styles.result}>The task is successfully saved!</span>}
				</div>
				<button
					className={`${common.button} ${common.button_lightSteelBlue} ${styles.submit}`}
					type="submit">
					Add
				</button>
			</Form>
		</Formik>
	);
};
