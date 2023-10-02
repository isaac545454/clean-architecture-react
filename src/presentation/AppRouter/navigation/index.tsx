import { createBrowserRouter } from 'react-router-dom'
import { ROUTES } from '../routes'
import { MakeLogin } from '@/main/factories/pages/login/login-factory'
import { MakeSignUp } from '@/main/factories/pages/signup/signup-factory'

export const router = createBrowserRouter([
	{
		path: ROUTES.Login,
		element: <MakeLogin />,
	},
	{
		path: ROUTES.signup,
		element: <MakeSignUp />,
	},
])
