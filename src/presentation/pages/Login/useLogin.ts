import { useState } from 'react';
import { StateFormValue } from './componentes/Form/state';
import { InvalidCredencialsError } from '@/Domain/error';
import { LoginProps } from '@/presentation/pages/Login/interface';

export const useLogin = ({ validation, authenticationSpy }: LoginProps) => {
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

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();

		if (form.isLoading || form.emailError || form.passwordError) return;

		try {
			setForm(prev => ({
				...prev,
				isLoading: true,
			}));
			const account = await authenticationSpy.auth({
				email: form.email,
				password: form.password,
			});
			localStorage.setItem('acessToken', account.accessToken);
		} catch (err: any) {
			setForm(prev => ({
				...prev,
				isLoading: false,
				main: err.message,
			}));
		}
	};

	return {
		form,
		setForm,
		changeInput,
		onSubmit,
	};
};
