import { Link } from 'react-router-dom';

import global from '../../styles/global.module.css';
import styles from './styles.module.css';

export const Home = () => {
	return (
		<section className={global.section}>
			<div className={`${global.container} ${global.container_withBackground}`}>
				<p className={styles.home__descr}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur natus maiores quam impedit
					velit eum nihil beatae voluptates, maxime voluptatum vel quas aperiam possimus dolores, iusto amet
					porro officiis! Odit? Aliquid delectus, id ipsum ut hic voluptatum pariatur eaque consectetur quis
					magnam ducimus expedita placeat perferendis quisquam similique laboriosam! Cumque eligendi
					distinctio doloribus officiis repudiandae eaque quasi facere aliquid illum.
				</p>
				<div className={styles.home__linksWrapper}>
					<Link
						className={`${global.button} ${global.button_deepSpaceSparkle} ${global.textCenter}`}
						to={`/login`}>
						Sign in
					</Link>
					<Link
						className={`${global.button} ${global.button_deepSpaceSparkle} ${global.textCenter}`}
						to={`/signup`}>
						Sign up
					</Link>
					<Link
						className={`${global.button} ${global.button_deepSpaceSparkle} ${global.textCenter}`}
						to={`/tasks`}>
						Tasks
					</Link>
				</div>
			</div>
		</section>
	);
};
