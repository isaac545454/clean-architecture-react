import { Valitation } from '@/presentation/protocols/validation'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class ValidationComposite implements Valitation {
	constructor(private readonly validators: FieldValidation[]) {}

	validate(fieldName: string, input: object): string | null {
		const validators = this.validators.filter(v => v.field === fieldName)

		for (const validator of validators) {
			const error = validator.validate(input)
			if (error) return error.message
		}
		return null
	}
}
