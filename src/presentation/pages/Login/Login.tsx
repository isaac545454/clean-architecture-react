import { Valitation } from '@/presentation/protocols/validation';
import { Form } from '../../components/Form';
import { AuthenticationSpy } from './login.spec';

export type LoginProps = {
	validation: Valitation;
	authenticationSpy: AuthenticationSpy;
};

export const Login: React.FC<LoginProps> = ({ validation, authenticationSpy }) => {
	return (
		<div className="flex flex-col  justify-between">
			<Form validation={validation} authenticationSpy={authenticationSpy} />
		</div>
	);
};
