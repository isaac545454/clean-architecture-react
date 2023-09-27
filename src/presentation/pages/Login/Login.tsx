import { Form } from './componentes/Form';
import { LoginProps } from './interface';

export const Login: React.FC<LoginProps> = ({ validation, authentication, saveAccessToken }) => {
	return (
		<div className="flex flex-col  justify-between">
			<Form validation={validation} authentication={authentication} saveAccessToken={saveAccessToken} />
		</div>
	);
};
