import { useAppSelector } from '../../../../redux/hooks';
import { selectFilters } from '../../../../redux/slices/filter/selectors';

import { FilterItem } from './features/filterItem';

import styles from './styles.module.css';

export const FilterList = () => {
	const filters = useAppSelector(selectFilters);

	return (
		<ul className={styles.filter}>
			{filters.map(({ id, name }) => (
				<FilterItem
					key={id}
					name={name}
				/>
			))}
		</ul>
	);
};
