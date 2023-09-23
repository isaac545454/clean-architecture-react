import { EmailValidation } from './email-validation';
import { InvalidFielError } from '@/validation/errors/invalid-field-error';
import { faker } from '@faker-js/faker';

const makeSut = () => ({ sut: new EmailValidation(faker.animal.cat()) });

describe('EmailValidation', () => {
	test('should return Error if email is invalid', () => {
		const { sut } = makeSut();
		const error = sut.validate(faker.animal.cat());
		expect(error).toEqual(new InvalidFielError());
	});
	test('should return falsy if email is valid', () => {
		const { sut } = makeSut();
		const error = sut.validate(faker.internet.email());
		expect(error).toBeFalsy();
	});
	test('should return falsy if email is empty', () => {
		const { sut } = makeSut();
		const error = sut.validate('');
		expect(error).toBeFalsy();
	});
});
