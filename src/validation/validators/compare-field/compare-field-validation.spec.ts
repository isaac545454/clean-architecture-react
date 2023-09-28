import { InvalidFielError } from '@/validation/errors';
import { CompareFieldsValidation } from './compare-field-validation';
import { faker } from '@faker-js/faker';

const makeSut = (valueToCompare: string) => ({ sut: new CompareFieldsValidation(faker.animal.cat(), valueToCompare) });

describe('CompareFieldsValidation', () => {
	test('should return error if compare is invalid', () => {
		const { sut } = makeSut(faker.database.mongodbObjectId());
		const error = sut.validate(faker.database.mongodbObjectId());
		expect(error).toEqual(new InvalidFielError());
	});
	// test('should return false if field is not empty', () => {
	// 	const { sut } = makeSut();
	// 	const error = sut.validate(faker.animal.cat());
	// 	expect(error).toBeFalsy();
	// });
});
