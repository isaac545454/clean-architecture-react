import { InvalidFielError } from '@/validation/errors'
import { MinLenthValidation } from './min-lenght-valitaion'
import { faker } from '@faker-js/faker'

const makeSut = (field: string) => ({ sut: new MinLenthValidation(field, 5) })

describe('minLengthValidation', () => {
	test('should return Error if value is invalid', () => {
		const field = faker.database.column()
		const { sut } = makeSut(field)
		const error = sut.validate({ [field]: '124' })
		expect(error).toEqual(new InvalidFielError())
	})
	test('should return falsy if value is invalid', () => {
		const field = faker.database.column()
		const { sut } = makeSut(field)
		const error = sut.validate({ [field]: '12345' })
		expect(error).toBeFalsy()
	})
})
