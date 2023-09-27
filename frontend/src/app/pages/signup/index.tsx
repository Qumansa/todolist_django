import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { useSignUpMutation } from '@redux/slices/api';
import { setUser } from '@redux/slices/auth';

import { ErrorMessage } from '@components/errorMessage';
import { Input } from '@components/input';
import { InputFile } from '@components/inputFile';
import { Spinner } from '@components/spinner';

import { File, User } from '@types';

import global from '@styles/global.module.css';
import styles from './styles.module.css';

export const SignUp = () => {
	const [signUp, { isLoading, isError, isSuccess }] = useSignUpMutation();

	const handleSubmit = ({ username, password, image }: User, resetForm: () => void) => {
		signUp({ username, password, image })
			.unwrap()
			.then(() => {
				resetForm();
			});
	};

	return (
		<section className={global.section}>
			<div className={`${styles.signup__container} ${global.container} ${global.container_withBackground}`}>
				{!isSuccess && (
					<Formik
						initialValues={{
							username: '',
							password: '',
							confirmPassword: '',
							image: '',
						}}
						validationSchema={Yup.object().shape({
							username: Yup.string()
								.matches(
									/^[a-zA-Z][a-zA-Z0-9-_]{2,20}$/,
									'3 to 20 characters. Must begin with a letter. Letters, numbers, underscores, hyphens allowed.'
								)
								.required('This field is required'),
							password: Yup.string()
								.matches(
									/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,20}$/,
									'6 to 20 characters. Must include uppercase and lowercase letters, a number and a special character(!@#$%).'
								)
								.required('This field is required'),
							confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match'),
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
								.notRequired(),
						})}
						onSubmit={(signupData, { resetForm }) => handleSubmit(signupData, resetForm)}>
						<Form className={styles.signup__form}>
							<Input
								label="Username*"
								name="username"
								type="text"
								placeholder="John Doe"
								focusOnPageLoad
							/>
							<Input
								label="Password*"
								name="password"
								type="password"
							/>
							<Input
								label="Confirm password*"
								name="confirmPassword"
								type="password"
							/>
							<InputFile
								label="Profile image"
								name="image"
								classNameForInput={global.input_small}
							/>
							<button
								className={`${styles.signup__submit} ${global.button} ${global.button_deepSpaceSparkle}`}
								type="submit">
								Submit
							</button>
						</Form>
					</Formik>
				)}
				{isLoading && <Spinner />}
				{isError && <ErrorMessage />}
				{isSuccess && (
					<>
						<p className={styles.signup__success}>Account successfully created!</p>
						<Link
							to="/login"
							className={`${global.button} ${global.button_deepSpaceSparkle} ${global.textCenter}`}>
							Log in
						</Link>
					</>
				)}
			</div>
		</section>
	);
};
