import { createBrowserRouter } from 'react-router-dom';
import { Login } from '@/presentation/pages/Login';
import { ROUTES } from '../routes';

export const router = createBrowserRouter([
	{
		path: ROUTES.Login,
		element: <Login />, 
	},
]);
