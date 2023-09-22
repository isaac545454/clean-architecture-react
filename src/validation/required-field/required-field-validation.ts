import { RequiredFieldError } from '../errors/required-field-error';
import { FieldValidation } from '../protocols/field-validation';

export class RequiredFieldValidation implements FieldValidation {
	constructor(readonly field: string) {}

	validate(value: string): Error {
		return new RequiredFieldError();
	}
}
