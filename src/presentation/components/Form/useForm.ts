import { LoginProps } from '@/presentation/pages/Login';
import { useState } from 'react';
import { StateFormValue } from './state';

export const useForm = ({ validation }: LoginProps) => {
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

	const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();

		setForm(prev => ({
			...prev,
			isLoading: true,
		}));
	};

	return {
		form,
		setForm,
		changeInput,
		onSubmit,
	};
};
