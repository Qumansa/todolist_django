import { Form, Formik } from 'formik';
import { useRef, useState } from 'react';
import * as Yup from 'yup';

import { useAppDispatch } from '@redux/hooks';
import {
	useChangeUserImageMutation,
	useChangeUserPasswordMutation,
	useGetUserQuery,
	useLogOutMutation,
} from '@redux/slices/api';
import { removeToken } from '@redux/slices/auth';

import { useSetIsVisibleToFalseAfterDelay } from '@hooks/useSetIsVisibleToFalseAfterDelay';

import { ErrorMessage } from '@components/errorMessage';
import { Input } from '@components/input';
import { InputFile } from '@components/inputFile';
import { Spinner } from '@components/spinner';

import { File, Timer } from '@types';
import { PasswordData } from './types';

import common from '@common/common.module.css';
import styles from './styles.module.css';

export const Settings = () => {
	// возможно, нужно делать один запрос и сохранять количество заданий в стейте, потому что повторный запрос делается в хедере
	const { data: user, isLoading: isLoadingUser, isError: isErrorUser, isSuccess: isSuccessUser } = useGetUserQuery();
	const [
		changeUserPassword,
		{
			isLoading: isLoadingChangePassword,
			isError: isErrorChangePassword,
			error: errorChangePassword,
			isSuccess: isSuccessChangePassword,
		},
	] = useChangeUserPasswordMutation();
	const [
		changeUserImage,
		{ isLoading: isLoadingChangeImage, isError: isErrorChangeImage, isSuccess: isSuccessChangeImage },
	] = useChangeUserImageMutation();
	const [logOut, { isLoading: isLoadingLogOut, isError: isErrorLogOut }] = useLogOutMutation();
	const [passwordBeingEdited, setPasswordBeingEdited] = useState(false);
	const [imageBeingEdited, setImageBeingEdited] = useState(false);
	const [isVisible, setIsVisible] = useState(true);
	const timerRef = useRef<Timer>(null);
	const dispatch = useAppDispatch();

	// выбрать один вариант, как делать запросы на сервер и обрабатывать ошибки, и применять только его
	// 1) .unwrap.then.catch.finally
	// 2) async...await, 'error' in result
	// 3) error, isError, isSuccess
	const handleChangePassword = ({ password }: PasswordData, resetForm: () => void) => {
		if (isVisible) return;

		changeUserPassword(password)
			.unwrap()
			.then(() => {
				resetForm();
			})
			.finally(() => {
				setIsVisible(true);
			});
	};

	// поменять тип
	const handleChangeImage = (image: any, resetForm: () => void) => {
		if (isVisible) return;

		changeUserImage(image)
			.unwrap()
			.then(() => {
				resetForm();
			})
			.finally(() => {
				setIsVisible(true);
			});
	};

	const handleReturn = () => {
		if (isVisible) return;

		setPasswordBeingEdited(false);
		setImageBeingEdited(false);
	};

	const toggleViewOfChangePassword = () => {
		setPasswordBeingEdited(true);
	};

	const toggleViewOfChangeImage = () => {
		setImageBeingEdited(true);
	};

	const handleLogOut = async () => {
		logOut()
			.unwrap()
			.then(() => {
				dispatch(removeToken());
			})
			.catch((error) => console.log(error));
	};

	useSetIsVisibleToFalseAfterDelay({ isVisible, setIsVisible, timerRef, timerDuration: 3500 });

	return (
		<section
			className={`${common.section} ${common.container} ${common.container_withBackground} ${styles.container}`}>
			<h2 className={common.section__title}>Account settings</h2>
			<div className={styles.wrapper}>
				<p className={styles.username}>Username: {(isSuccessUser && user?.username) || 'Not logged in'}</p>
				{isLoadingUser && <Spinner withModifier="spinner_extrasmall" />}
				{isVisible && isErrorUser && (
					<ErrorMessage
						withClassname={styles.result}
						message="Could not load username."
					/>
				)}

				{!passwordBeingEdited && !imageBeingEdited && (
					<>
						<button
							className={`${common.button} ${common.button_lightSteelBlue}`}
							onClick={toggleViewOfChangePassword}>
							Change password
						</button>
						<button
							className={`${common.button} ${common.button_lightSteelBlue}`}
							onClick={toggleViewOfChangeImage}>
							Change profile image
						</button>
					</>
				)}

				{passwordBeingEdited && (
					<Formik
						initialValues={{
							password: '',
							newPassword: '',
							confirmNewPassword: '',
						}}
						validationSchema={Yup.object().shape({
							password: Yup.string()
								.matches(
									/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,20}$/,
									'6 to 20 characters. Must include uppercase and lowercase letters, a number and a special character(!@#$%).'
								)
								.required('This field is required'),
							newPassword: Yup.string()
								.matches(
									/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,20}$/,
									'6 to 20 characters. Must include uppercase and lowercase letters, a number and a special character(!@#$%).'
								)
								.required('This field is required'),
							confirmNewPassword: Yup.string()
								.oneOf([Yup.ref('password')], 'Passwords must match')
								.required('This field is required'),
						})}
						onSubmit={(passwordData, { resetForm }) => handleChangePassword(passwordData, resetForm)}>
						<Form className={styles.form}>
							<Input
								label="Current password"
								name="password"
								type="password"
							/>
							<Input
								label="New password"
								name="newPassword"
								type="password"
							/>
							<Input
								label="Confirm password"
								name="confirmNewPassword"
								type="password"
							/>
							<div className={styles.buttonsWrapper}>
								<button
									className={`${styles.submit} ${common.button} ${common.button_deepSpaceSparkle}`}
									type="submit">
									Submit
								</button>
								<button
									className={`${styles.submit} ${common.button} ${common.button_lightSteelBlue}`}
									onClick={handleReturn}>
									Return
								</button>
							</div>
						</Form>
					</Formik>
				)}
				{isLoadingChangePassword && <Spinner withModifier="spinner_extrasmall" />}
				{/* проверить работоспособность */}
				{isVisible ? (
					errorChangePassword && 'status' in errorChangePassword && errorChangePassword.status === 401 ? (
						<ErrorMessage
							message="Username and password don't match"
							withClassname={styles.result}
						/>
					) : (
						errorChangePassword &&
						('status' && 'error') in errorChangePassword && (
							<ErrorMessage
								// message={JSON.stringify(errorChangePassword.data)}
								withClassname={styles.result}
							/>
						)
					)
				) : null}
				{isVisible && isSuccessChangePassword && (
					<p className={styles.result}>Password successfully changed!</p>
				)}

				{imageBeingEdited && (
					<Formik
						initialValues={{
							image: '',
						}}
						validationSchema={Yup.object().shape({
							image: Yup.mixed<File>()
								.test(
									'size',
									'The size of image must be below 1mb',
									(value) => !value || (value && value.size <= 1024 * 1024)
								)
								.test(
									'format',
									'Accepted formats are .jpg, .jpeg, .png',
									(value) =>
										!value ||
										(value && ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type))
								)
								.required(),
						})}
						onSubmit={(imageData, { resetForm }) => handleChangeImage(imageData, resetForm)}>
						<Form className={styles.form}>
							<InputFile
								label="Profile image"
								name="image"
								classNameForInput={common.input_small}
							/>
							<div className={styles.buttonsWrapper}>
								<button
									className={`${styles.submit} ${common.button} ${common.button_deepSpaceSparkle}`}
									type="submit">
									Submit
								</button>
								<button
									className={`${styles.submit} ${common.button} ${common.button_lightSteelBlue}`}
									onClick={handleReturn}>
									Return
								</button>
							</div>
						</Form>
					</Formik>
				)}
				{isLoadingChangeImage && <Spinner withModifier="spinner_extrasmall" />}
				{isVisible && isErrorChangeImage && <ErrorMessage withClassname={styles.result} />}
				{isVisible && isSuccessChangeImage && (
					<p className={styles.result}>Profile image successfully changed!</p>
				)}

				<button
					className={`${styles.logOut} ${common.button} ${common.button_deepSpaceSparkle}`}
					onClick={handleLogOut}>
					Log out
				</button>
				{isLoadingLogOut && <Spinner />}
				{isVisible && isErrorLogOut && <ErrorMessage />}
			</div>
		</section>
	);
};
