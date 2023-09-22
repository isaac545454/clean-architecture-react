import { RequiredFieldError } from '../errors/required-field-error';
import { RequiredFieldValidation } from './required-field-validation';

describe('RequiredFieldValidation', () => {
	test('should return error if field is empty', () => {
		const sut = new RequiredFieldValidation('email');
		const error = sut.validate('email');
		expect(error).toEqual(new RequiredFieldError());
	});
});
