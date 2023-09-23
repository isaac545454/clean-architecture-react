import { InvalidFielError } from '@/validation/errors';
import { MinLenthValidation } from './min-lenght-valitaion';

const makeSut = () => ({ sut: new MinLenthValidation('field', 5) });

describe('minLengthValidation', () => {
	test('should return Error if value is invalid', () => {
		const { sut } = makeSut();
		const error = sut.validate('123');
		expect(error).toEqual(new InvalidFielError());
	});
	test('should return falsy if value is invalid', () => {
		const { sut } = makeSut();
		const error = sut.validate('12345');
		expect(error).toBeFalsy();
	});
});
