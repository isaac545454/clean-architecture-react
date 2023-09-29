import { Form } from './componentes/Form';
import { SignUpProps } from './interface';

export const SignUp: React.FC<SignUpProps> = ({ validation }) => {
	return (
		<div className="flex flex-col  justify-between">
			<Form validation={validation} />
		</div>
	);
};
