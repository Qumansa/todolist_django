import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAppSelector } from '@redux/hooks';
import { selectToken } from '@redux/slices/auth/selectors';

// import { Spinner } from '@components/spinner';

export const RequireAuth = () => {
	const token = useAppSelector(selectToken);
	const location = useLocation();

	return token ? (
		<Outlet />
	) : (
		<Navigate
			to="/login"
			state={{ from: location }}
			replace
		/>
	);
};
