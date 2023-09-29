import { useState } from 'react';
import { StateFormValue } from './state';

export const useSignUp = () => {
	const [form, setForm] = useState(StateFormValue);

	return { form };
};
