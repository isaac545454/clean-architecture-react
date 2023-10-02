import { RequiredFieldError } from '../../errors/required-field-error'
import { FieldValidation } from '../../protocols/field-validation'

export class RequiredFieldValidation implements FieldValidation {
	constructor(readonly field: string) {}

	validate(input: object): Error | null {
		if (!input[this.field]) return new RequiredFieldError()
		return null
	}
}
