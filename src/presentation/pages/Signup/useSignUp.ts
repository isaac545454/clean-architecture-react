import { useState } from 'react';
import { StateFormValue } from './state';
import { SignUpProps } from './interface';

export const useSignUp = ({ validation }: SignUpProps) => {
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

	return { form, changeInput };
};
