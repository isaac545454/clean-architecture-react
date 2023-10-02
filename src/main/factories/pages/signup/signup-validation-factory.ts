import { ValidationBuilder, ValidationComposite } from '@/validation'

export const makeValidationSignUp = (): ValidationComposite => {
	return new ValidationComposite([
		...ValidationBuilder.field('name').required().min(5).build(),
		...ValidationBuilder.field('email').required().email().build(),
		...ValidationBuilder.field('password').required().min(5).build(),
		...ValidationBuilder.field('confirmation').required().semeAs('password').build(),
	])
}
