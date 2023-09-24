import { Login } from '@/presentation/pages/Login';
import { makeRemoteAuthentication } from '../../useCases/remote/remote-authentication-factory';
import { makeValidationLogin } from './login-validation-factory';

export const MakeLogin = () => {
	return <Login authenticationSpy={makeRemoteAuthentication('/login')} validation={makeValidationLogin()} />;
};
