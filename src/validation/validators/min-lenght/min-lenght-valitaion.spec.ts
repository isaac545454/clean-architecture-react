import { InvalidFielError } from '@/validation/errors';
import { MinLenthValidation } from './min-lenght-valitaion';

describe('minLengthValidation', () => {
	test('should return Error if value is invalid', () => {
		const sut = new MinLenthValidation('field', 5);
		const error = sut.validate('123');
		expect(error).toEqual(new InvalidFielError());
	});
});
