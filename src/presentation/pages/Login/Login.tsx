import { Valitation } from '@/presentation/protocols/validation';
import { Form } from '../../components/Form';

export type LoginProps = {
	validation: Valitation;
};

export const Login: React.FC<LoginProps> = ({ validation }) => {
	return (
		<div className="flex flex-col  justify-between">
			<Form validation={validation} />
		</div>
	);
};
