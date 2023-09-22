import { EmailValidation } from './email-validation';
import { InvalidFielError } from '@/validation/errors/invalid-field-error';

describe('EmailValidation', () => {
	test('should return Error if email is invalid', () => {
		const sut = new EmailValidation('email');
		const error = sut.validate('');
		expect(error).toEqual(new InvalidFielError());
	});
});
