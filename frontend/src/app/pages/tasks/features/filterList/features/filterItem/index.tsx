import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { filterChanged } from '@redux/slices/filter';
import { selectActiveFilter } from '@redux/slices/filter/selectors';

import { Props } from './types';

import common from '@common/common.module.css';

export const FilterItem = ({ name }: Props) => {
	const dispatch = useAppDispatch();
	const activeFilter = useAppSelector(selectActiveFilter);

	const handleFilterChange = () => {
		dispatch(filterChanged(name));
	};

	return (
		<li>
			<button
				className={`
                    ${common.button} 
                    ${common.button_lightSteelBlue} 
                    ${name === activeFilter ? common.button_lightSteelBlue_active : ''}
                `}
				onClick={handleFilterChange}>
				{name}
			</button>
		</li>
	);
};
