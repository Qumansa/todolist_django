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

import { ChangePasswordData, File, Timer } from '@types';

import common from '@styles/common.module.css';
import styles from './styles.module.css';

export const Settings = () => {
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
	const [isVisible, setIsVisible] = useState(false);
	const timerRef = useRef<Timer>(null);
	const dispatch = useAppDispatch();

	const handleChangePassword = ({ old_password, new_password }: ChangePasswordData, resetForm: () => void) => {
		if (isVisible) return;

		changeUserPassword({ old_password, new_password })
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

	const handleLogOut = () => {
		logOut()
			.unwrap()
			.then(() => {
				dispatch(removeToken());
			});
	};

	useSetIsVisibleToFalseAfterDelay({ isVisible, setIsVisible, timerRef, timerDuration: 3500 });

	return (
		<section
			className={`${common.section} ${common.container} ${common.container_withBackground} ${styles.container}`}>
			<div className={styles.wrapper}>
				<h2 className={common.section__title}>Account settings</h2>
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
							old_password: '',
							new_password: '',
							confirm_new_password: '',
						}}
						validationSchema={Yup.object().shape({
							old_password: Yup.string()
								.matches(
									/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,20}$/,
									'6 to 20 characters. Must include uppercase and lowercase letters, a number and a special character(!@#$%).'
								)
								.required('This field is required'),
							new_password: Yup.string()
								.matches(
									/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,20}$/,
									'6 to 20 characters. Must include uppercase and lowercase letters, a number and a special character(!@#$%).'
								)
								.required('This field is required'),
							confirm_new_password: Yup.string()
								.oneOf([Yup.ref('new_password')], 'Passwords must match')
								.required('This field is required'),
						})}
						validateOnBlur={false}
						onSubmit={(changePasswordData, { resetForm }) =>
							handleChangePassword(changePasswordData, resetForm)
						}>
						<Form className={styles.form}>
							<Input
								label="Current password"
								name="old_password"
								type="password"
							/>
							<Input
								label="New password"
								name="new_password"
								type="password"
							/>
							<Input
								label="Confirm password"
								name="confirm_new_password"
								type="password"
							/>
							<div className={styles.buttonsWrapper}>
								<button
									className={`${common.button} ${common.button_deepSpaceSparkle}`}
									type="submit">
									Submit
								</button>
								<button
									className={`${common.button} ${common.button_lightSteelBlue}`}
									onClick={handleReturn}>
									Return
								</button>
							</div>
						</Form>
					</Formik>
				)}
				{isLoadingChangePassword && <Spinner withModifier="spinner_extrasmall" />}
				{isVisible &&
					(errorChangePassword && 'status' in errorChangePassword && errorChangePassword.status === 400 ? (
						<ErrorMessage
							message="Username and current password don't match."
							withClassname={styles.result}
						/>
					) : (
						isErrorChangePassword && <ErrorMessage withClassname={styles.result} />
					))}
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
						validateOnBlur={false}
						onSubmit={(imageData, { resetForm }) => handleChangeImage(imageData, resetForm)}>
						<Form className={styles.form}>
							<InputFile
								label="Profile image"
								name="image"
								classNameForInput={common.input_small}
							/>
							<div className={styles.buttonsWrapper}>
								<button
									className={`${common.button} ${common.button_deepSpaceSparkle}`}
									type="submit">
									Submit
								</button>
								<button
									className={`${common.button} ${common.button_lightSteelBlue}`}
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
