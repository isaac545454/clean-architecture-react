import { FieldValidationSpy } from '@/validation/test';
import { ValidationComposite } from './validation-composite';
import { faker } from '@faker-js/faker';

const makeSut = (fieldName: string) => {
	const fielValidationSpy = [new FieldValidationSpy(fieldName), new FieldValidationSpy(fieldName)];

	const sut = new ValidationComposite(fielValidationSpy);
	return {
		sut,
		fielValidationSpy,
	};
};

describe('ValidationComposite', () => {
	test('should return error if any validation failsc', () => {
		const fieldName = faker.database.column();
		const { sut, fielValidationSpy } = makeSut(fieldName);
		const errorMessage = faker.animal.cat();

		fielValidationSpy[0].error = new Error(errorMessage);
		fielValidationSpy[1].error = new Error(faker.animal.cat());

		const error = sut.validate(fieldName, faker.animal.cat());
		expect(error).toBe(errorMessage);
	});
	test('should return error if any validation failsc', () => {
		const fieldName = faker.database.column();
		const { sut } = makeSut(fieldName);

		const error = sut.validate(fieldName, faker.animal.cat());
		expect(error).toBeFalsy();
	});
});
