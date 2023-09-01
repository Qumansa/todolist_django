import { useMemo } from 'react';

import { useAppSelector } from '../../../../redux/hooks';
import { useGetToDoListQuery } from '../../../../redux/slices/api';
import { selectActiveFilter } from '../../../../redux/slices/filter/selectors';
import { selectSearchValue } from '../../../../redux/slices/search/selectors';

import { ErrorMessage } from '../../../../components/errorMessage';
import { Spinner } from '../../../../components/spinner';
import { ToDoItem } from './features/toDoItem';

import { IToDoItem } from './types';

export const ToDoList = () => {
	const { data: toDoList = [], isLoading, isError } = useGetToDoListQuery();
	const searchValue = useAppSelector(selectSearchValue);
	const activeFilter = useAppSelector(selectActiveFilter);

	const searchTask = (toDoList: IToDoItem[], searchValue: string) =>
		searchValue.length === 0
			? toDoList
			: toDoList.filter((toDoItem) =>
					toDoItem.description.toLowerCase().includes(searchValue.trim().toLowerCase())
			  );

	const filterToDoList = (toDoList: IToDoItem[]) => {
		switch (activeFilter) {
			case 'All':
				return toDoList;
			case 'Favourite':
				return toDoList.filter((filter) => filter.favourite);
			case 'A...z':
				return [...toDoList].sort((a, b) =>
					a.description.toLowerCase() < b.description.toLowerCase() ? -1 : 1
				);
			case 'Z...a':
				return [...toDoList].sort((a, b) =>
					a.description.toLowerCase() > b.description.toLowerCase() ? -1 : 1
				);
			default:
				return toDoList;
		}
	};

	// const filteredToDoList = filterToDoList(searchTask(toDoList, searchValue));
	const filteredToDoList = useMemo(
		() => filterToDoList(searchTask(toDoList, searchValue)),
		[toDoList, searchValue, activeFilter]
	);

	return isLoading ? (
		<Spinner />
	) : isError ? (
		<ErrorMessage />
	) : toDoList.length === 0 ? (
		<ErrorMessage message="There are no tasks yet!" />
	) : filteredToDoList.length === 0 ? (
		<ErrorMessage message="No tasks found!" />
	) : (
		<ul className="to-do-list__list">
			{filteredToDoList.map(({ id, ...props }: IToDoItem, index: number) => (
				<ToDoItem
					key={id}
					id={id}
					index={index}
					{...props}
				/>
			))}
		</ul>
	);
};
