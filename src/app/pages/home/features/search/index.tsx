import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { searchChanged } from '../../../../redux/slices/search';
import { selectSearchValue } from '../../../../redux/slices/search/selectors';

import global from '../../../../styles/global.module.css';

export const Search = () => {
	const dispatch = useAppDispatch();
	const searchValue = useAppSelector(selectSearchValue);

	return (
		<input
			type="text"
			className={`${global.input} ${global.input_search}`}
			placeholder="Search a task"
			value={searchValue}
			onChange={(e) => dispatch(searchChanged(e.target.value))}
		/>
	);
};
