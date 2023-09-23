import { ValidationComposite } from './validation-composite';
import { FieldValidationSpy } from '../test/mock-field-validation';

const makeSut = () => {
	const fielValidationSpy = [new FieldValidationSpy('any_field'), new FieldValidationSpy('any_field')];

	const sut = new ValidationComposite(fielValidationSpy);
	return {
		sut,
		fielValidationSpy,
	};
};

describe('ValidationComposite', () => {
	test('should return error if any validation failsc', () => {
		const { sut, fielValidationSpy } = makeSut();

		fielValidationSpy[0].error = new Error('first_error_message');
		fielValidationSpy[1].error = new Error('secondy_error_message');

		const error = sut.validate('any_field', 'any_value');
		expect(error).toBe('first_error_message');
	});
});
