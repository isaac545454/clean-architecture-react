import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication';
import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client';
import { Login } from '@/presentation/pages/Login';
import { ValidationBuilder, ValidationComposite } from '@/validation';

export const MakeLogin = () => {
	const url = 'http://localhost:5050/api/login';
	const axiosHttpClient = new AxiosHttpClient();
	const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient);
	const validationCompose = new ValidationComposite([
		...ValidationBuilder.field('email').required().email().build(),
		...ValidationBuilder.field('password').required().required().min(5).build(),
	]);

	return <Login authenticationSpy={remoteAuthentication} validation={validationCompose} />;
};
