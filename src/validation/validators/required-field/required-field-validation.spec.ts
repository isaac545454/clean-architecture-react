import { RequiredFieldError } from '../../errors/required-field-error';
import { RequiredFieldValidation } from './required-field-validation';
import { faker } from '@faker-js/faker';

const makeSut = () => ({ sut: new RequiredFieldValidation(faker.animal.cat()) });

describe('RequiredFieldValidation', () => {
	test('should return error if field is empty', () => {
		const { sut } = makeSut();
		const error = sut.validate('');
		expect(error).toEqual(new RequiredFieldError());
	});
	test('should return false if field is not empty', () => {
		const { sut } = makeSut();
		const error = sut.validate(faker.animal.cat());
		expect(error).toBeFalsy();
	});
});
