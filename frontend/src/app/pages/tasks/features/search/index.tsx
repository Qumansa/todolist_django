import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { searchChanged } from '@redux/slices/search';
import { selectSearchValue } from '@redux/slices/search/selectors';

import common from '@common/common.module.css';

export const Search = () => {
	const dispatch = useAppDispatch();
	const searchValue = useAppSelector(selectSearchValue);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(searchChanged(e.target.value));
	};

	return (
		<input
			type="text"
			className={`${common.input} ${common.input_width50}`}
			placeholder="Search a task"
			value={searchValue}
			onChange={handleChange}
		/>
	);
};
