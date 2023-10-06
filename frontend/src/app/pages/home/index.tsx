import { Link } from 'react-router-dom';

import { useAppSelector } from '@redux/hooks';
import { selectToken } from '@redux/slices/auth/selectors';

import common from '@common/common.module.css';
import styles from './styles.module.css';

export const Home = () => {
	const token = useAppSelector(selectToken);

	return (
		<section className={`${common.section} ${common.container} ${common.container_withBackground}`}>
			<p className={styles.home__descr}>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur natus maiores quam impedit velit
				eum nihil beatae voluptates, maxime voluptatum vel quas aperiam possimus dolores, iusto amet porro
				officiis! Odit? Aliquid delectus, id ipsum ut hic voluptatum pariatur eaque consectetur quis magnam
				ducimus expedita placeat perferendis quisquam similique laboriosam! Cumque eligendi distinctio doloribus
				officiis repudiandae eaque quasi facere aliquid illum.
			</p>
			<div className={styles.home__linksWrapper}>
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
