import { Form, Formik, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { useAppDispatch } from '../../redux/hooks';
import { useLogInMutation } from '../../redux/slices/api';
import { setCredentials } from '../../redux/slices/auth';

import { ErrorMessage } from '../../components/errorMessage';
import { Input } from '../../components/input';
import { Spinner } from '../../components/spinner';

import { ILogInData } from './types';

import global from '../../styles/global.module.css';
import styles from './styles.module.css';

export const Login = () => {
	const dispatch = useAppDispatch();
	const [logIn, { error, isLoading, isSuccess }] = useLogInMutation();
	const navigate = useNavigate();

	const handleSubmit = ({ name, password }: ILogInData, resetForm: () => void) => {
		logIn({ name, password })
			.unwrap()
			.then((userData: ILogInData) => {
				console.log(321);
				dispatch(setCredentials({ ...userData, name }));
				resetForm();
				navigate('/tasks');
			});
	};

	return (
		<section className={global.section}>
			<div className={`${styles.login__container} ${global.container} ${global.container_withBackground}`}>
				<Formik
					initialValues={{
						name: '',
						password: '',
					}}
					// validationSchema={Yup.object({
					// 	name: Yup.string()
					// 		.matches(
					// 			/^[a-zA-Z][a-zA-Z0-9-_]{2,20}$/,
					// 			'3 to 20 characters. Must begin with a letter. Letters, numbers, underscores, hyphens allowed.'
					// 		)
					// 		.required('This field is required'),
					// 	password: Yup.string()
					// 		.matches(
					// 			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,20}$/,
					// 			'6 to 20 characters. Must include uppercase and lowercase letters, a number and a special character(!@#$%).'
					// 		)
					// 		.required('This field is required'),
					// })}
					onSubmit={(loginData, { resetForm }) => handleSubmit(loginData, resetForm)}>
					<Form className={styles.login__form}>
						<Input
							label="Username*"
							name="name"
							type="text"
							placeholder="John Doe"
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
