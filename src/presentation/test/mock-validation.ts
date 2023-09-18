import { Valitation } from '@/presentation/protocols/validation';

export class ValidationSpy implements Valitation {
	errorMessage: string = '';
	fieldName: string = '';
	fieldValue: string = '';

	validate(fieldName: string, fielValue: string): string {
		this.fieldName = fieldName;
		this.fieldValue = fielValue;
		return this.errorMessage;
	}
}
