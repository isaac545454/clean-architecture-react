import { Login } from '@/presentation/pages/Login'
import { makeValidationLogin } from './login-validation-factory'
import { makeLocalSaveAcessToken } from '@/main/factories/useCases/save-access-token/storage-save-access-token-factory'
import { makeRemoteAuthentication } from '../../useCases/remote/remote-authentication-factory'

export const MakeLogin = () => {
	return (
		<Login
			authentication={makeRemoteAuthentication('/login')}
			validation={makeValidationLogin()}
			saveAccessToken={makeLocalSaveAcessToken()}
		/>
	)
}
