import { InvalidFielError } from '@/validation/errors'

export class CompareFieldsValidation {
	constructor(readonly field: string, private readonly valueToCompare: string) {}

	validate(input: object): Error | null {
		if (input[this.field] !== input[this.valueToCompare]) return new InvalidFielError()
		return null
	}
}
