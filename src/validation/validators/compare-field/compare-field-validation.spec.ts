import { InvalidFielError } from '@/validation/errors'
import { CompareFieldsValidation } from './compare-field-validation'
import { faker } from '@faker-js/faker'

const makeSut = (field: string, valueToCompare: string) => ({ sut: new CompareFieldsValidation(field, valueToCompare) })

describe('CompareFieldsValidation', () => {
	test('should return error if compare is invalid', () => {
		const field = faker.animal.cat()
		const valueToCompare = faker.database.mongodbObjectId()
		const { sut } = makeSut(field, valueToCompare)
		const error = sut.validate({
			[field]: faker.database.mongodbObjectId(),
			[valueToCompare]: faker.database.mongodbObjectId(),
		})
		expect(error).toEqual(new InvalidFielError())
	})
	test('should return falsy if compare is valid', () => {
		const valueToCompare = faker.database.mongodbObjectId()
		const field = faker.animal.cat()
		const value = faker.database.mongodbObjectId()
		const { sut } = makeSut(field, valueToCompare)
		const error = sut.validate({
			[field]: value,
			[valueToCompare]: value,
		})
		expect(error).toBeFalsy()
	})
})
