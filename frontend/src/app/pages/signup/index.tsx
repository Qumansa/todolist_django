import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { useAppSelector } from '@redux/hooks';
import { useSignUpMutation } from '@redux/slices/api';
import { selectToken } from '@redux/slices/auth/selectors';

import { ErrorMessage } from '@components/errorMessage';
import { Input } from '@components/input';
import { InputFile } from '@components/inputFile';
import { Spinner } from '@components/spinner';

import { File, User } from '@types';

import common from '@styles/common.module.css';
import styles from './styles.module.css';

export const SignUp = () => {
	const [signUp, { isLoading, isError, error, isSuccess }] = useSignUpMutation();
	const token = useAppSelector(selectToken);
	// const formRef = useRef(null);

	const handleSubmit = ({ username, password, img }: User, resetForm: () => void) => {
		// console.log(img);
		const data = new FormData();
		data.append('username', username);
		data.append('password', password);
		data.append('img', img);
		signUp(data)
			.unwrap()
			.then(() => {
				resetForm();
			});

		// fetch('http://127.0.0.1:8000/api/auth/register/', {
		// 	credentials: 'include',
		// 	method: 'POST',
		// 	body: data,
		// });

		// fetch('http://127.0.0.1:8000/api/auth/user/', {
		// 	credentials: 'include',
		// })
		// 	.then((response) => response.json())
		// 	.then((result) => console.log(result));
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
						img: {},
					}}
					validationSchema={Yup.object().shape({
						username: Yup.string()
							// Посмотреть в библиотеке Yup, если возможно сделать подсказки для того, что нужно вводить в input
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
						// image: Yup.mixed<File>()
						// 	.test(
						// 		'size',
						// 		'The size of image must be below 1mb',
						// 		(value) => !value || (value && value.size <= 1024 * 1024)
						// 	)
						// 	.test(
						// 		'format',
						// 		'Accepted formats are .jpg, .jpeg, .png',
						// 		(value) =>
						// 			!value || (value && ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type))
						// 	)
						// 	.notRequired(),
						img: Yup.mixed<any>().notRequired(),
					})}
					validateOnBlur={false}
					onSubmit={(signupData, { resetForm }) => handleSubmit(signupData, resetForm)}>
					{({ setFieldValue }) => (
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
							{/* <InputFile
								label="Profile image"
								name="image"
								optional
								classNameForInput={common.input_small}
							/> */}
							<input
								type="file"
								name="img"
								onChange={(e) =>
									setFieldValue('img', e.currentTarget.files && e.currentTarget.files[0])
								}
							/>
							<button
								className={`${styles.submit} ${common.button} ${common.button_deepSpaceSparkle}`}
								type="submit">
								Create an account
							</button>
						</Form>
					)}
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
