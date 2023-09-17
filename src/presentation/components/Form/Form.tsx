import { useState } from 'react';
import { Input } from '../Input/Input';
import Spiner from '../Spiner/Spiner';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

const StateFormValue = {
	isLoading: false,
	main: '',
	emailError: 'campo obrigatorio',
	passwordError: 'campo obrigatorio',
};

export function Form() {
	const [form, setForm] = useState(StateFormValue);

	return (
		<form className="flex flex-col w-[500px] mx-auto bg-white p-8 rounded-xl self-center shadow-md">
			<h2 className="text-primaryDark text-center text-2xl uppercase font-bold">Login</h2>
			<Input type="email" name="email" placeholder="digite seu e-mail" testid="email-status" title={form.emailError} />
			<Input
				type="password"
				name="password"
				placeholder="digite seu senha"
				testid="password-status"
				title={form.passwordError}
			/>
			<button
				type="submit"
				data-testid="submit"
				disabled
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
}
