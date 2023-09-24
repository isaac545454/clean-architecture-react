import { Form } from './componentes/Form';
import { LoginProps } from './interface';

export const Login: React.FC<LoginProps> = ({ validation, authenticationSpy }) => {
	return (
		<div className="flex flex-col  justify-between">
			<Form validation={validation} authenticationSpy={authenticationSpy} />
		</div>
	);
};
