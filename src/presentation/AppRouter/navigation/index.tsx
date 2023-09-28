import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '../routes';
import { MakeLogin } from '@/main/factories/pages/login/login-factory';
import { SignUp } from '@/presentation/pages/Signup';

export const router = createBrowserRouter([
	{
		path: ROUTES.Login,
		element: <MakeLogin />,
	},
	{
		path: ROUTES.signup,
		element: <SignUp />,
	},
]);
