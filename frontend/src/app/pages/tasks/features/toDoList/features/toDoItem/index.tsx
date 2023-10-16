import { Form, Formik } from 'formik';
import { useRef, useState } from 'react';
import * as Yup from 'yup';

import { useDeleteToDoItemMutation, useUpdateToDoItemMutation } from '@redux/slices/api';

import { useSetIsVisibleToFalseAfterDelay } from '@hooks/useSetIsVisibleToFalseAfterDelay';

import { ErrorMessage } from '@components/errorMessage';
import { Input } from '@components/input';
import { Spinner } from '@components/spinner';

import { IToDoItem, Timer } from '@types';
import { Props, editTaskData } from './types';

import common from '@styles/common.module.css';
import styles from './styles.module.css';

export const ToDoItem = ({ id, index, description, favourite }: Props) => {
	const [updateToDoItem, { isLoading: isUpdateLoading, isError: isUpdateError, isSuccess: isUpdateSuccess }] =
		useUpdateToDoItemMutation();
	const [deleteToDoItem, { isLoading: isDeleteLoading, isError: isDeleteError }] = useDeleteToDoItemMutation();
	const [beingEdited, setBeingEdited] = useState(false);
	const [currentDescription, setCurrentDescription] = useState(description);
	const [isVisible, setIsVisible] = useState(false);
	const timerRef = useRef<Timer>(null);
	const btnActiveClass = favourite ? `${styles.button_active}` : '';

	const handleEdit = () => {
		if (isVisible) return;

		setBeingEdited((prev) => !prev);
	};

	const handleClose = () => {
		setCurrentDescription(description);
		setBeingEdited(false);
	};

	const handleSave = (id: IToDoItem['id'], { description }: editTaskData) => {
		if (isVisible) return;

		if (description !== currentDescription) {
			updateToDoItem({ id, description })
				.unwrap()
				.then(() => {
					setCurrentDescription(description);
				})
				.catch(() => {
					setCurrentDescription(currentDescription);
				})
				.finally(() => {
					setIsVisible(true);
				});
		}

		setBeingEdited(false);
	};

	const handleDelete = (id: IToDoItem['id']) => {
		if (isVisible) return;

		deleteToDoItem(id)
			.unwrap()
			.catch(() => {
				setIsVisible(true);
			});
	};

	const handleToggle = (id: IToDoItem['id'], favourite: IToDoItem['favourite']) => {
		if (isVisible) return;

		updateToDoItem({
			id,
			favourite: !favourite,
		})
			.unwrap()
			.catch(() => {
				setIsVisible(true);
			});
	};

	useSetIsVisibleToFalseAfterDelay({ isVisible, setIsVisible, timerRef, timerDuration: 4000 });

	return (
		<li className={styles.item}>
			<div className={styles.task}>
				<span>{index + 1})</span>
				{beingEdited ? (
					<Formik
						initialValues={{
							description: currentDescription,
						}}
						validationSchema={Yup.object({
							description: Yup.string()
								.trim()
								.min(1, 'The length of the task must be from 1 to 255 characters.')
								.max(255, 'The length of the task must be from 1 to 255 characters.')
								.required('This field is required.'),
						})}
						validateOnBlur={false}
						onSubmit={(editTaskData) => handleSave(id, editTaskData)}>
						<Form className={styles.form}>
							<div className={styles.inputWrapper}>
								<Input
									name="description"
									type="text"
									classNameForInput={styles.input}
									focusOnComponentLoad
								/>
							</div>
							<button
								className={styles.button}
								type="submit"
								aria-label="Save">
								<svg
									className={styles.buttonImg}
									version="1.1"
									xmlns="http://www.w3.org/2000/svg"
									x="0px"
									y="0px"
									viewBox="0 0 480.358 480.358">
									<g>
										<path d="M387.702,43.753L181.316,253.467l-90.84-88.044L0,258.771l183.479,177.834l296.879-301.667L387.702,43.753z M182.98,394.343L42.421,258.108l48.719-50.265l90.676,87.886L388.042,86.178l49.892,49.1L182.98,394.343z" />
									</g>
								</svg>
							</button>
						</Form>
					</Formik>
				) : (
					<>
						<div className={styles.descriptionWrapper}>
							<button
								className={styles.description}
								onDoubleClick={handleEdit}>
								{description}
							</button>
							{isVisible && (isUpdateError || isDeleteError) && (
								<ErrorMessage withClassname={styles.descriptionNote} />
							)}
							{isVisible && isUpdateSuccess && (
								<span className={styles.descriptionNote}>The task is successfully saved!</span>
							)}
						</div>
						{(isUpdateLoading || isDeleteLoading) && <Spinner withModifier="spinner_extrasmall" />}
					</>
				)}
			</div>
			<ul className={styles.buttons}>
				{beingEdited ? (
					<li>
						<button
							className={styles.button}
							aria-label="Close"
							onClick={handleClose}>
							<svg
								className={styles.buttonImg}
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M6.22566 4.81096C5.83514 4.42044 5.20197 4.42044 4.81145 4.81096C4.42092 5.20148 4.42092 5.83465 4.81145 6.22517L10.5862 11.9999L4.81151 17.7746C4.42098 18.1651 4.42098 18.7983 4.81151 19.1888C5.20203 19.5793 5.8352 19.5793 6.22572 19.1888L12.0004 13.4141L17.7751 19.1888C18.1656 19.5793 18.7988 19.5793 19.1893 19.1888C19.5798 18.7983 19.5798 18.1651 19.1893 17.7746L13.4146 11.9999L19.1893 6.22517C19.5799 5.83465 19.5799 5.20148 19.1893 4.81096C18.7988 4.42044 18.1657 4.42044 17.7751 4.81096L12.0004 10.5857L6.22566 4.81096Z"
									fill="black"
								/>
							</svg>
						</button>
					</li>
				) : (
					<li>
						<button
							className={`${styles.button} ${btnActiveClass}`}
							aria-label="Edit"
							onClick={handleEdit}>
							<svg
								className={styles.buttonImg}
								version="1.1"
								xmlns="http://www.w3.org/2000/svg"
								x="0px"
								y="0px"
								viewBox="0 0 490.337 490.337">
								<g>
									<g>
										<path
											d="M229.9,145.379l-47.5,47.5c-17.5,17.5-35.1,35-52.5,52.7c-4.1,4.2-7.2,9.8-8.4,15.3c-6.3,28.9-12.4,57.8-18.5,86.7
                                            l-3.4,16c-1.6,7.8,0.5,15.6,5.8,20.9c4.1,4.1,9.8,6.4,15.8,6.4c1.7,0,3.4-0.2,5.1-0.5l17.6-3.7c28-5.9,56.1-11.9,84.1-17.7
                                            c6.5-1.4,12-4.3,16.7-9c78.6-78.7,157.2-157.3,235.8-235.8c5.8-5.8,9-12.7,9.8-21.2c0.1-1.4,0-2.8-0.3-4.1c-0.5-2-0.9-4.1-1.4-6.1
                                            c-1.1-5.1-2.3-10.9-4.7-16.5l0,0c-14.7-33.6-39.1-57.6-72.5-71.1c-6.7-2.7-13.8-3.6-20-4.4l-1.7-0.2c-9-1.1-17.2,1.9-24.3,9.1
                                            C320.4,54.879,275.1,100.179,229.9,145.379z M386.4,24.679c0.2,0,0.3,0,0.5,0l1.7,0.2c5.2,0.6,10,1.2,13.8,2.8
                                            c27.2,11,47.2,30.6,59.3,58.2c1.4,3.2,2.3,7.3,3.2,11.6c0.3,1.6,0.7,3.2,1,4.8c-0.4,1.8-1.1,3-2.5,4.3
                                            c-78.7,78.5-157.3,157.2-235.9,235.8c-1.3,1.3-2.5,1.9-4.3,2.3c-28.1,5.9-56.1,11.8-84.2,17.7l-14.8,3.1l2.8-13.1
                                            c6.1-28.8,12.2-57.7,18.4-86.5c0.2-0.9,1-2.3,1.9-3.3c17.4-17.6,34.8-35.1,52.3-52.5l47.5-47.5c45.3-45.3,90.6-90.6,135.8-136
                                            C384.8,24.979,385.7,24.679,386.4,24.679z"
										/>
										<path
											d="M38.9,109.379h174.6c6.8,0,12.3-5.5,12.3-12.3s-5.5-12.3-12.3-12.3H38.9c-21.5,0-38.9,17.5-38.9,38.9v327.4
                                            c0,21.5,17.5,38.9,38.9,38.9h327.3c21.5,0,38.9-17.5,38.9-38.9v-167.5c0-6.8-5.5-12.3-12.3-12.3s-12.3,5.5-12.3,12.3v167.5
                                            c0,7.9-6.5,14.4-14.4,14.4H38.9c-7.9,0-14.4-6.5-14.4-14.4v-327.3C24.5,115.879,31,109.379,38.9,109.379z"
										/>
									</g>
								</g>
							</svg>
						</button>
					</li>
				)}
				<li>
					<button
						className={`${styles.button} ${btnActiveClass}`}
						aria-label="Favourite"
						onClick={() => handleToggle(id, favourite)}>
						<svg
							className={`${styles.buttonImg} ${styles.buttonImg_favourite}`}
							viewBox="-1 0 18 15"
							fill="white"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M15.4829 5.28193L10.6864 4.59758L8.54222 0.330127C8.48365 0.213287 8.38731 0.118702 8.26829 0.0612089C7.96981 -0.0834504 7.6071 0.037099 7.45786 0.330127L5.3137 4.59758L0.517213 5.28193C0.384974 5.30047 0.26407 5.36167 0.171503 5.45441C0.0595945 5.56733 -0.0020722 5.71924 5.31712e-05 5.87678C0.00217854 6.03431 0.0679221 6.18457 0.182838 6.29454L3.65316 9.61614L2.83328 14.3064C2.81405 14.4156 2.82635 14.5278 2.86878 14.6304C2.91121 14.733 2.98207 14.8218 3.07333 14.8869C3.16459 14.952 3.27259 14.9906 3.38509 14.9985C3.4976 15.0064 3.6101 14.9831 3.70983 14.9314L8.00004 12.717L12.2902 14.9314C12.4074 14.9926 12.5434 15.013 12.6737 14.9908C13.0024 14.9352 13.2235 14.6291 13.1668 14.3064L12.3469 9.61614L15.8172 6.29454C15.9117 6.20367 15.974 6.08497 15.9929 5.95515C16.0439 5.63059 15.8135 5.33015 15.4829 5.28193Z"
								fill="white"></path>
						</svg>
					</button>
				</li>
				<li>
					<button
						className={styles.button}
						aria-label="Delete"
						onClick={() => handleDelete(id)}>
						<svg
							className={styles.buttonImg}
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 128 128">
							<path d="M24,41h77v63c0,9.37-7.63,17-17,17H44c-9.37,0-17-7.63-17-17V52c0-1.66-1.34-3-3-3s-3,1.34-3,3v52c0,12.68,10.32,23,23,23 h40c12.68,0,23-10.32,23-23V40.64c5.72-1.36,10-6.5,10-12.64c0-7.17-5.83-13-13-13H24c-7.17,0-13,5.83-13,13S16.83,41,24,41z M24,21h80c3.86,0,7,3.14,7,7s-3.14,7-7,7H24c-3.86,0-7-3.14-7-7S20.14,21,24,21z" />
							<path d="M49,7h30c1.66,0,3-1.34,3-3s-1.34-3-3-3H49c-1.66,0-3,1.34-3,3S47.34,7,49,7z" />
							<path d="M53,104V58c0-1.66-1.34-3-3-3s-3,1.34-3,3v46c0,1.66,1.34,3,3,3S53,105.66,53,104z" />
							<path d="M81,104V58c0-1.66-1.34-3-3-3s-3,1.34-3,3v46c0,1.66,1.34,3,3,3S81,105.66,81,104z" />
						</svg>
					</button>
				</li>
			</ul>
		</li>
	);
};
