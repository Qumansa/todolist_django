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
							.min(3, 'Must be between 3 and 20 characters')
							.max(20, 'Must be between 3 and 20 characters')
							.required('This field is required'),
						password: Yup.string()
							.min(6, 'Must be between 6 and 20 characters')
							.max(20, 'Must be between 6 and 20 characters')
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
							className={`${styles.login__submit} ${global.button} ${global.button_deepSpaceSparkle}`}>
							Submit
						</button>
					</Form>
				</Formik>
			</div>
		</section>
	);
};
