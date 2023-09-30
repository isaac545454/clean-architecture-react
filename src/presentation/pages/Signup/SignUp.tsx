import { Form } from './componentes/Form'
import { SignUpProps } from './interface'

export const SignUp: React.FC<SignUpProps> = ({ validation, addAccount }) => {
	return (
		<div className="flex flex-col  justify-between">
			<Form validation={validation} addAccount={addAccount} />
		</div>
	)
}
