import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { Input } from '../../components/input';

import global from '../../styles/global.module.css';
import styles from './styles.module.css';

export const Login = () => {
	return (
		<section className={global.section}>
			<div className={`${global.container} ${global.container_withBackground}`}>
				<Formik
					initialValues={{
						name: '',
						password: '',
					}}
					validationSchema={Yup.object({
						name: Yup.string()
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
					onSubmit={(values, { setSubmitting }) => {
						setTimeout(() => {
							alert(JSON.stringify(values, null, 2));
							setSubmitting(false);
						}, 400);
					}}>
					<Form className={styles.login__form}>
						<Input
							label="Username*"
							name="name"
							type="text"
							placeholder="John Doe"
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
			</div>
		</section>
	);
};
