import { createHashRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import { Layout } from './layout';
import { Home, Login, Page404, Settings, SignUp, Tasks } from './pages';

import { RequireAuth } from '@components/requireAuth';

import './styles/main.css';

export const App = () => {
	// поменять обратно на  createBrowserRouter
	const router = createHashRouter(
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
					path="*"
					element={<Page404 />}
				/>

				{/* <Route element={<RequireAuth />}> */}
				<Route
					path="/tasks"
					element={<Tasks />}
				/>
				<Route
					path="/settings"
					element={<Settings />}
				/>
				{/* </Route> */}
			</Route>
		)
	);

	return <RouterProvider router={router} />;
};
