import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import { Layout } from './layout';
import { Home, Login, SignUp, Tasks } from './pages';

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
				<Route
					path="/login"
					element={<Login />}
				/>
				<Route
					path="/signup"
					element={<SignUp />}
				/>
				<Route
					path="/tasks"
					element={<Tasks />}
				/>
			</Route>
		)
	);

	return <RouterProvider router={router} />;
};
