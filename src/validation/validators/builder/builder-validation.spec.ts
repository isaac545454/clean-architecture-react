import { RequiredFieldValidation } from '../required-field/required-field-validation';
import { ValidationBuilder as sut } from './builder-validation';

describe('ValidationBuilder', () => {
	test('should return RequiredFielValidation', () => {
		const validations = sut.field('any_field').required().build();
		expect(validations).toEqual([new RequiredFieldValidation('any_field')]);
	});
});
