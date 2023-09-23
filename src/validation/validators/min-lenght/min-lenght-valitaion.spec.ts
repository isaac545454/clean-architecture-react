import { InvalidFielError } from '@/validation/errors';
import { MinLenthValidation } from './min-lenght-valitaion';
import { faker } from '@faker-js/faker';

const makeSut = () => ({ sut: new MinLenthValidation(faker.database.column(), 5) });

describe('minLengthValidation', () => {
	test('should return Error if value is invalid', () => {
		const { sut } = makeSut();
		const error = sut.validate('124');
		expect(error).toEqual(new InvalidFielError());
	});
	test('should return falsy if value is invalid', () => {
		const { sut } = makeSut();
		const error = sut.validate('12345');
		expect(error).toBeFalsy();
	});
});
