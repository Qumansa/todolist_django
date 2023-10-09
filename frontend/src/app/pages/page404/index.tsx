import { Link } from 'react-router-dom';

import common from '@common/common.module.css';
import styles from './styles.module.css';

export const Page404 = () => (
	<section className={`${common.section} ${common.container} ${common.container_withBackground} ${styles.container}`}>
		<svg
			className={styles.img}
			width="400"
			height="400"
			fill="#395c6b"
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 60 60">
			<g>
				<path
					d="M0,0v12v2v46h60V14v-2V0H0z M20,39h-3v8c0,0.552-0.448,1-1,1s-1-0.448-1-1v-8H9c-0.552,0-1-0.448-1-1V27
	c0-0.552,0.448-1,1-1s1,0.448,1,1v10h5v-2c0-0.552,0.448-1,1-1s1,0.448,1,1v2h3c0.552,0,1,0.448,1,1S20.552,39,20,39z M36,41.5
	c0,3.584-2.916,6.5-6.5,6.5S23,45.084,23,41.5v-9c0-3.584,2.916-6.5,6.5-6.5s6.5,2.916,6.5,6.5V41.5z M51,39h-3v8
	c0,0.552-0.448,1-1,1s-1-0.448-1-1v-8h-6c-0.552,0-1-0.448-1-1V27c0-0.552,0.448-1,1-1s1,0.448,1,1v10h5v-2c0-0.552,0.448-1,1-1
	s1,0.448,1,1v2h3c0.552,0,1,0.448,1,1S51.552,39,51,39z M2,12V2h56v10H2z"
				/>
				<polygon
					points="54.293,3.293 52,5.586 49.707,3.293 48.293,4.707 50.586,7 48.293,9.293 49.707,10.707 52,8.414 54.293,10.707 
	55.707,9.293 53.414,7 55.707,4.707 	"
				/>
				<rect
					x="3"
					y="3"
					width="39"
					height="8"
				/>
				<path d="M29.5,28c-2.481,0-4.5,2.019-4.5,4.5v9c0,2.481,2.019,4.5,4.5,4.5s4.5-2.019,4.5-4.5v-9C34,30.019,31.981,28,29.5,28z" />
			</g>
		</svg>
		<h2 className={styles.text}>Page not found!</h2>
		<Link
			className={`${common.button} ${common.button_deepSpaceSparkle}`}
			to={`/`}>
			Back to Homepage
		</Link>
	</section>
);
