import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { useAppDispatch } from '@redux/hooks';
import { useLogInMutation } from '@redux/slices/api';
import { setCredentials } from '@redux/slices/auth';

import { ErrorMessage } from '@components/errorMessage';
import { Input } from '@components/input';
import { Spinner } from '@components/spinner';

import { LogInData, Tokens } from './types';

import global from '@styles/global.module.css';
import styles from './styles.module.css';

export const Login = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [logIn, { error, isLoading }] = useLogInMutation();

	const handleSubmit = ({ username, password }: LogInData, resetForm: () => void) => {
		logIn({ username, password })
			.unwrap()
			.then((result: Tokens) => {
				dispatch(
					setCredentials({
						user: {
							username,
						},
						token: result.access,
					})
				);
				resetForm();
				navigate('/tasks');
			});
	};

	return (
		<section className={global.section}>
			<div className={`${styles.login__container} ${global.container} ${global.container_withBackground}`}>
				<Formik
					initialValues={{
						username: '',
						password: '',
					}}
					validationSchema={Yup.object({
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
					})}
					onSubmit={(loginData, { resetForm }) => handleSubmit(loginData, resetForm)}>
					<Form className={styles.login__form}>
						<Input
							label="Username*"
							name="username"
							type="text"
							placeholder="John Doe"
							autoComplete="on"
							focusOnPageLoad
						/>
						<Input
							label="Password*"
							name="password"
							type="password"
						/>
						<button
							className={`${styles.login__submit} ${global.button} ${global.button_deepSpaceSparkle}`}
							type="submit">
							Submit
						</button>
					</Form>
				</Formik>
				{isLoading && <Spinner />}
				{error && 'status' in error && error.status === 401 ? (
					<ErrorMessage message="Username and password don't match" />
				) : error && ('status' && 'error') in error ? (
					<ErrorMessage message={JSON.stringify(error.data)} />
				) : null}
			</div>
		</section>
	);
};
