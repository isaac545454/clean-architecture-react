import { ValidationBuilder, ValidationComposite } from '@/validation';
import { makeValidationLogin } from './login-validation-factory';

describe('LoginValidationFactory', () => {
	test('should make ValidationComposite with correct validations', () => {
		const composite = makeValidationLogin();
		expect(composite).toEqual(
			new ValidationComposite([
				...ValidationBuilder.field('email').required().email().build(),
				...ValidationBuilder.field('password').required().required().min(5).build(),
			]),
		);
	});
});
