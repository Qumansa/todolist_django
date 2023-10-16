import { Link } from 'react-router-dom';

import { useAppSelector } from '@redux/hooks';
import { selectToken } from '@redux/slices/auth/selectors';

import common from '@styles/common.module.css';
import styles from './styles.module.css';

export const Home = () => {
	const token = useAppSelector(selectToken);

	return (
		<section className={`${common.section} ${common.container} ${common.container_withBackground}`}>
			<p className={styles.descr}>Welcome to our application!</p>
			<p className={styles.descr}>
				In it, you can create a task list that will remind you of things that need to be done. If necessary,
				each task can be edited, marked as a favorite or deleted. There is also a convenient sorting option, as
				well as a search field for the desired task.
			</p>
			<p className={styles.descr}>To use the app, you need to create an account and log in.</p>
			<div className={styles.linksWrapper}>
				{token ? (
					<Link
						className={`${common.button} ${common.button_deepSpaceSparkle} ${common.textCenter}`}
						to={`/tasks`}>
						Tasks
					</Link>
				) : (
					<Link
						className={`${common.button} ${common.button_deepSpaceSparkle} ${common.textCenter}`}
						to={`/login`}>
						Log in
					</Link>
				)}
				<Link
					className={`${common.button} ${common.button_deepSpaceSparkle} ${common.textCenter}`}
					to={`/signup`}>
					Create an account
				</Link>
			</div>
		</section>
	);
};
