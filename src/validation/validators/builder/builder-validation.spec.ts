import { CompareFieldsValidation } from '../compare-field/compare-field-validation'
import { EmailValidation } from '../email/email-validation'
import { MinLenthValidation } from '../min-lenght/min-lenght-valitaion'
import { RequiredFieldValidation } from '../required-field/required-field-validation'
import { ValidationBuilder as sut } from './builder-validation'
import { faker } from '@faker-js/faker'

describe('ValidationBuilder', () => {
	test('should return RequiredFielValidation', () => {
		const field = faker.database.column()
		const validations = sut.field(field).required().build()
		expect(validations).toEqual([new RequiredFieldValidation(field)])
	})
	test('should return EmailValidation', () => {
		const field = faker.database.column()
		const validations = sut.field(field).email().build()
		expect(validations).toEqual([new EmailValidation(field)])
	})
	test('should return MinLenthValidation', () => {
		const field = faker.database.column()
		const number = faker.number.int()
		const validations = sut.field(field).min(number).build()
		expect(validations).toEqual([new MinLenthValidation(field, number)])
	})
	test('should return CompareFieldsValidation', () => {
		const field = faker.database.column()
		const fieldToCompare = faker.database.column()

		const validations = sut.field(field).semeAs(fieldToCompare).build()
		expect(validations).toEqual([new CompareFieldsValidation(field, fieldToCompare)])
	})
	test('should return list of validations', () => {
		const field = faker.database.column()
		const number = faker.number.int()
		const validations = sut.field(field).required().email().min(number).build()
		expect(validations).toEqual([
			new RequiredFieldValidation(field),
			new EmailValidation(field),
			new MinLenthValidation(field, number),
		])
	})
})
