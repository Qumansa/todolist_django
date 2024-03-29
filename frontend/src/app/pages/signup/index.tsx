import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { useSignUpMutation } from '@redux/slices/api';

import { ErrorMessage } from '@components/errorMessage';
import { Input } from '@components/input';
import { InputFile } from '@components/inputFile';
import { Spinner } from '@components/spinner';

import { User } from '@types';

import common from '@styles/common.module.css';
import styles from './styles.module.css';

export const SignUp = () => {
	const [signUp, { isLoading, isError, error, isSuccess }] = useSignUpMutation();

	const handleSubmit = ({ username, password, img }: User, resetForm: () => void) => {
		const formData = new FormData();
		formData.append('username', username);
		formData.append('password', password);
		img && formData.append('img', img);

		signUp(formData)
			.unwrap()
			.then(() => {
				resetForm();
			});
	};

	return (
		<section
			className={`${common.section} ${common.container} ${common.container_withBackground} ${styles.container}`}>
			{!isSuccess && (
				<Formik
					initialValues={{
						username: '',
						password: '',
						confirmPassword: '',
					}}
					validationSchema={Yup.object().shape({
						username: Yup.string()
							.matches(
								/^[a-zA-Z][a-zA-Z0-9-_]{2,20}$/,
								'3 to 20 characters. Must begin with a letter. Letters, numbers, underscores, hyphens allowed.'
							)
							.required('This field is required.'),
						password: Yup.string()
							.matches(
								/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,20}$/,
								'6 to 20 characters. Must include uppercase and lowercase letters, a number and a special character(!@#$%).'
							)
							.required('This field is required.'),
						confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match'),
						img: Yup.mixed<File>()
							.test(
								'size',
								'The size of image must be below 1mb.',
								(value) => !value || (value && value.size <= 1024 * 1024)
							)
							.test(
								'format',
								'Accepted formats are ".jpg", ".jpeg", ".png".',
								(value) =>
									!value || (value && ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type))
							)
							.notRequired(),
					})}
					validateOnBlur={false}
					onSubmit={(signupData, { resetForm }) => handleSubmit(signupData, resetForm)}>
					<Form className={styles.form}>
						<Input
							label="Username"
							name="username"
							type="text"
							placeholder="John Doe"
							focusOnComponentLoad
						/>
						<Input
							label="Password"
							name="password"
							type="password"
						/>
						<Input
							label="Confirm password"
							name="confirmPassword"
							type="password"
						/>
						<InputFile
							label="Profile image"
							name="img"
							classNameForInput={common.input_small}
							optional
						/>
						<button
							className={`${styles.submit} ${common.button} ${common.button_deepSpaceSparkle}`}
							type="submit">
							Create an account
						</button>
					</Form>
				</Formik>
			)}
			{isLoading && <Spinner />}
			{error && 'status' in error && error.status === 400 ? (
				<ErrorMessage message="This username has already been taken." />
			) : (
				isError && <ErrorMessage />
			)}
			{isSuccess && (
				<>
					<p className={styles.signup__success}>Account successfully created!</p>
					<Link
						to="/login"
						className={`${common.button} ${common.button_deepSpaceSparkle} ${common.textCenter}`}>
						Log in
					</Link>
				</>
			)}
		</section>
	);
};
