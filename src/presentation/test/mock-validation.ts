import { Valitation } from '@/presentation/protocols/validation'

export class ValidationSpy implements Valitation {
	errorMessage: string = ''
	fieldName: string = ''
	fieldValue: string = ''

	validate(fieldName: string, input: object): string {
		this.fieldName = fieldName
		this.fieldValue = input[fieldName]
		return this.errorMessage
	}
}
