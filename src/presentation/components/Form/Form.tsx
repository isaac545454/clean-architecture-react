import { useState } from 'react';
import { Input } from '../Input/Input';
import Spiner from '../Spiner/Spiner';
import { ErrorMessage } from '../ErrorMessage';

export type StateFormProps = {
	isLoading: boolean;
	isError: string;
};

const StateFormValue: StateFormProps = {
	isLoading: false,
	isError: '',
};

export function Form() {
	const [form, setForm] = useState<StateFormProps>(StateFormValue);

	return (
		<form className="flex flex-col w-[500px] mx-auto bg-white p-8 rounded-xl self-center shadow-md">
			<h2 className="text-primaryDark text-center text-2xl uppercase font-bold">Login</h2>
			<Input type="email" name="email" placeholder="digite seu e-mail" />
			<Input type="password" name="password" placeholder="digite seu senha" />
			<button
				type="submit"
				className="bg-primary text-white rounded-xl text-lg border-none leading-[60px] hover:opacity-90 mb-6"
			>
				ENTRAR
			</button>
			<div data-testid="error-wrap">
				{form.isError && <ErrorMessage isError={form.isError} />}
				{form.isLoading && <Spiner />}
			</div>
			<div className="text-center  hover:text-primary font-bold transition-all">
				<a href="">Criar Conta</a>
			</div>
		</form>
	);
}
