import { Valitation } from '@/presentation/protocols/validation';
import { Form } from '../../components/Form';

export type LoginProps = {
	validate(name: string, value: string): unknown;
};

export const Login: React.FC<LoginProps> = ({ validation }) => {
	return (
		<div className="flex flex-col  justify-between">
			<Form validation={validation} />
		</div>
	);
};
