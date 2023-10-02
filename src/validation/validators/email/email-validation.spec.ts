import { EmailValidation } from './email-validation'
import { InvalidFielError } from '@/validation/errors/invalid-field-error'
import { faker } from '@faker-js/faker'

const makeSut = (field: string) => ({ sut: new EmailValidation(field) })

describe('EmailValidation', () => {
	test('should return Error if email is invalid', () => {
		const field = faker.animal.cat()
		const { sut } = makeSut(field)
		const error = sut.validate({ [field]: faker.animal.cat() })
		expect(error).toEqual(new InvalidFielError())
	})
	test('should return falsy if email is valid', () => {
		const field = faker.animal.cat()
		const { sut } = makeSut(field)
		const error = sut.validate({ [field]: faker.internet.email() })
		expect(error).toBeFalsy()
	})
	test('should return falsy if email is empty', () => {
		const field = faker.animal.cat()
		const { sut } = makeSut(field)
		const error = sut.validate({ [field]: '' })
		expect(error).toBeFalsy()
	})
})
