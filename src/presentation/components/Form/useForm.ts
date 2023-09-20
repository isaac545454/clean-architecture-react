import { LoginProps } from '@/presentation/pages/Login';
import { useState } from 'react';
import { StateFormValue } from './state';

export const useForm = ({ validation, authenticationSpy }: LoginProps) => {
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

		setForm(prev => ({
			...prev,
			isLoading: true,
		}));

		await authenticationSpy.auth({
			email: form.email,
			password: form.password,
		});
	};

	return {
		form,
		setForm,
		changeInput,
		onSubmit,
	};
};
