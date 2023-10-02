import { RequiredFieldError } from '../../errors/required-field-error'
import { RequiredFieldValidation } from './required-field-validation'
import { faker } from '@faker-js/faker'

const makeSut = (field: string) => ({ sut: new RequiredFieldValidation(field) })

describe('RequiredFieldValidation', () => {
	test('should return error if field is empty', () => {
		const field = faker.animal.cat()
		const { sut } = makeSut(field)
		const error = sut.validate({ [field]: '' })
		expect(error).toEqual(new RequiredFieldError())
	})
	test('should return false if field is not empty', () => {
		const field = faker.animal.cat()
		const { sut } = makeSut(field)
		const error = sut.validate({ [field]: faker.animal.cat() })
		expect(error).toBeFalsy()
	})
})
