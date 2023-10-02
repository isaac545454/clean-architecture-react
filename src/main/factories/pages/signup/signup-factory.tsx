import { makeLocalSaveAcessToken } from '@/main/factories/useCases/save-access-token/storage-save-access-token-factory'
import { SignUp } from '@/presentation/pages/Signup'
import { makeValidationSignUp } from './signup-validation-factory'
import { makeAddAccount } from '../../useCases/remote/add-account-factory'

export const MakeSignUp = () => {
	return (
		<SignUp
			addAccount={makeAddAccount('/signup')}
			validation={makeValidationSignUp()}
			saveAccessToken={makeLocalSaveAcessToken()}
		/>
	)
}
