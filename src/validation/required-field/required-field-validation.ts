import { RequiredFieldError } from '../errors/required-field-error';
import { FieldValidation } from '../protocols/field-validation';

export class RequiredFieldValidation implements FieldValidation {
	constructor(readonly field: string) {}

	validate(value: string): Error | null {
		if (!value) return new RequiredFieldError();
		return null;
	}
}
