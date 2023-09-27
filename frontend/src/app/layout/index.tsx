import { Outlet } from 'react-router-dom';

import { Header } from './header';

export const Layout = () => (
	<>
		<Header />
		<main>
			<Outlet />
		</main>
	</>
);
