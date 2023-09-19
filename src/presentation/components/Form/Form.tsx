import { useState } from 'react';
import { Input } from '../Input/Input';
import Spiner from '../Spiner/Spiner';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { LoginProps } from '@/presentation/pages/Login';

const StateFormValue = {
	isLoading: false,
	main: '',
	emailError: 'campo obrigatorio',
	passwordError: 'campo obrigatorio',
	email: '',
	password: '',
};

export const Form: React.FC<LoginProps> = ({ validation }) => {
	const [form, setForm] = useState(StateFormValue);

	const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm(pre => {
			return {
				...pre,
				[e.target.name]: e.target.value,
				[`${e.target.name}Error`]: validation.validate(e.target.name, e.target.value),
			};
		});
	};

	return (
		<form className="flex flex-col w-[500px] mx-auto bg-white p-8 rounded-xl self-center shadow-md">
			<h2 className="text-primaryDark text-center text-2xl uppercase font-bold">Login</h2>
			<Input
				type="email"
				name="email"
				placeholder="digite seu e-mail"
				testid="email-status"
				data-testid="email"
				title={form.emailError}
				value={form.email}
				onChange={e => changeInput(e)}
			/>
			<Input
				type="password"
				name="password"
				placeholder="digite seu senha"
				testid="password-status"
				data-testid="password"
				title={form.passwordError}
				value={form.email}
				onChange={e => changeInput(e)}
			/>
			<button
				type="submit"
				data-testid="submit"
				disabled={!!form.emailError || !!form.passwordError}
				className="bg-primary text-white rounded-xl text-lg border-none leading-[60px] hover:opacity-90 mb-6 disabled:opacity-80"
			>
				ENTRAR
			</button>
			<div data-testid="error-wrap">
				{form.main && <ErrorMessage isError={form.main} />}
				{form.isLoading && <Spiner />}
			</div>
			<div className="text-center  hover:text-primary font-bold transition-all">
				<a href="">Criar Conta</a>
			</div>
		</form>
	);
};
