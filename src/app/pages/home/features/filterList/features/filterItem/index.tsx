import { useAppDispatch, useAppSelector } from '../../../../../../redux/hooks';

import { filterChanged } from '../../../../../../redux/slices/filter';
import { selectActiveFilter } from '../../../../../../redux/slices/filter/selectors';

import { FilterItemProps } from './types';

import global from '../../../../../../styles/global.module.css';

export const FilterItem = ({ name }: FilterItemProps) => {
	const dispatch = useAppDispatch();
	const activeFilter = useAppSelector(selectActiveFilter);

	return (
		<li>
			<button
				className={`
                    ${global.button} 
                    ${global.button_lightSteelBlue} 
                    ${name === activeFilter ? global.button_lightSteelBlue_active : ''}
                `}
				onClick={() => dispatch(filterChanged(name))}>
				{name}
			</button>
		</li>
	);
};
