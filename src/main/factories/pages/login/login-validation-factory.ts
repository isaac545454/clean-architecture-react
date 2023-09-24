import { ValidationBuilder, ValidationComposite } from '@/validation';

export const makeValidationLogin = (): ValidationComposite => {
	return new ValidationComposite([
		...ValidationBuilder.field('email').required().email().build(),
		...ValidationBuilder.field('password').required().required().min(5).build(),
	]);
};
