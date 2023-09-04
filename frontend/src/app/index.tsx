import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import { Layout } from './layout';
import { Home } from './pages';

import './styles/main.css';

export const App = () => {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route
				path="/"
				element={<Layout />}>
				<Route
					index
					element={<Home />}
				/>
			</Route>
		)
	);

	return <RouterProvider router={router} />;
};