import { InvalidFielError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class MinLenthValidation implements FieldValidation {
	constructor(readonly field: string, private readonly minLength: number) {}

	validate(input: object): Error | null {
		if (input[this.field].length >= this.minLength) return null
		return new InvalidFielError()
	}
}
