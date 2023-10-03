import { ValidationBuilder, ValidationComposite } from '@/validation'
import { makeValidationSignUp } from './signup-validation-factory'

describe('SignUpValidationFactory', () => {
	test('should make ValidationComposite with correct validations', () => {
		const composite = makeValidationSignUp()
		expect(composite).toEqual(
			new ValidationComposite([
				...ValidationBuilder.field('name').required().min(5).build(),
				...ValidationBuilder.field('email').required().email().build(),
				...ValidationBuilder.field('password').required().min(5).build(),
				...ValidationBuilder.field('passwordConfirmation').required().semeAs('password').build(),
			]),
		)
	})
})
