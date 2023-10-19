import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '@redux/hooks';
import { useGetToDoListQuery, useGetUserQuery } from '@redux/slices/api';
import { selectToken } from '@redux/slices/auth/selectors';

import { ErrorMessage } from '@components/errorMessage';
import { Spinner } from '@components/spinner';

import UserImg from './assets/img/mockup-user-picture.jpg';

import common from '@styles/common.module.css';
import styles from './styles.module.css';

export const Header = () => {
	const {
		data: toDoList = [],
		isLoading: isLoadingToDoList,
		isError: isErrorToDoList,
		isSuccess: isSuccessToDoList,
		error: errorToDoList,
		refetch: refetchToDoList,
	} = useGetToDoListQuery();
	const {
		data: user,
		isLoading: isLoadingUser,
		isError: isErrorUser,
		isSuccess: isSuccessUser,
		error: errorUser,
		refetch: refetchUser,
	} = useGetUserQuery();
	const token = useAppSelector(selectToken);

	useEffect(() => {
		refetchUser();
		refetchToDoList();
	}, [token]);

	return (
		<header className={`${common.container} ${styles.container} `}>
			<Link
				to={'/'}
				className={styles.logo}>
				{/* возможно, можно вынести все svg-изображения в отдельный спрайт */}
				<svg
					viewBox="0 0 400 400.00001"
					version="1.1">
					<g transform="translate(0,-652.36216)">
						<path
							fill="#395c6b"
							d="m 162.2617,652.15012 0,28.6992 -27.7617,0.01 0,-28.7051 -25,0 0,28.707 -27,0 0,-0.043 -25,0 0,0.043 0,25 0,45 0,25 0,251.71298 0,25 25,0 235,0 23.2148,0 1.7852,0 0,-171.57038 0,-200.1855 -51.2383,0.01 0,-28.6777 -25,0 0,28.6816 -27.7617,0.01 0,-28.6875 -25,0 0,28.6914 -26.2383,0 0,-28.6953 -25,0 z M 82.5,705.86491 l 27,0 0,21.2872 25,0 0,-21.2872 27.7617,0 0,21.2872 25,0 0,-21.2872 26.2383,0 0,21.2872 25,0 0,-21.2872 27.7617,0 0,21.2872 25,0 0,-21.2872 26.2383,0 0,45 -235,0 0,-45 z m 0,70 235,0 0,112.1426 0,139.57039 -235,0 0,-251.71299 z m 25.4551,30.252 0,25 30.6074,0 0,-25 -30.6074,0 z m 55.6074,0 0,25 127.5332,0 0,-25 -127.5332,0 z m -55.6074,58 0,25 30.6074,0 0,-25 -30.6074,0 z m 55.6074,0 0,25 127.4883,0 0,-25 -127.4883,0 z m -55.6074,58 0,25 30.6074,0 0,-25 -30.6074,0 z m 55.6074,0 0,25 127.082,0 0,-25 -127.082,0 z m -55.6074,56 0,25.00009 30.6074,0 0,-25.00009 -30.6074,0 z m 55.6074,0 0,25.00009 127.5078,0 0,-25.00009 -127.5078,0 z"></path>
					</g>
				</svg>
			</Link>
			<div className={styles.user}>
				{(isLoadingToDoList || isLoadingUser) && <Spinner withModifier="spinner_extrasmall" />}
				<span className={styles.userName}>{(isSuccessUser && user?.username) || 'Not logged in'},&nbsp;</span>
				<div className={styles.tasksWrapper}>
					<Link
						to={'/tasks'}
						className={styles.tasks}>
						{isSuccessToDoList ? `${toDoList.length}` : 0}
						&nbsp;
						{isSuccessToDoList && toDoList.length === 1 ? 'task' : 'tasks'}
					</Link>
					{isErrorUser && 'status' in errorUser && errorUser.status !== 401 && (
						<ErrorMessage
							withClassname={styles.tasksError}
							message="Could not load username."
						/>
					)}
					{isErrorToDoList && 'status' in errorToDoList && errorToDoList.status !== 401 && (
						<ErrorMessage
							withClassname={styles.tasksError}
							message="Could not load amount of tasks."
						/>
					)}
				</div>
				<Link
					className={styles.userImgLink}
					to={'/settings'}>
					<img
						className={styles.userImg}
						src={UserImg}
						alt="Profile Picture"
					/>
				</Link>
			</div>
		</header>
	);
};
