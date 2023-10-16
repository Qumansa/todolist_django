import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { searchChanged } from '@redux/slices/search';
import { selectSearchValue } from '@redux/slices/search/selectors';

import common from '@styles/common.module.css';
import styles from './styles.module.css';

export const Search = () => {
	const dispatch = useAppDispatch();
	const searchValue = useAppSelector(selectSearchValue);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(searchChanged(e.target.value));
	};

	return (
		<label className={`${common.label} ${styles.label}`}>
			Search a task:
			<input
				type="text"
				className={common.input}
				value={searchValue}
				onChange={handleChange}
			/>
		</label>
	);
};
