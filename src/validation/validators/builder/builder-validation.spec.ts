import { EmailValidation } from '../email/email-validation';
import { MinLenthValidation } from '../min-lenght/min-lenght-valitaion';
import { RequiredFieldValidation } from '../required-field/required-field-validation';
import { ValidationBuilder as sut } from './builder-validation';

describe('ValidationBuilder', () => {
	test('should return RequiredFielValidation', () => {
		const validations = sut.field('any_field').required().build();
		expect(validations).toEqual([new RequiredFieldValidation('any_field')]);
	});
	test('should return EmailValidation', () => {
		const validations = sut.field('any_field').email().build();
		expect(validations).toEqual([new EmailValidation('any_field')]);
	});
	test('should return MinLenthValidation', () => {
		const validations = sut.field('any_field').min(5).build();
		expect(validations).toEqual([new MinLenthValidation('any_field', 5)]);
	});
});
