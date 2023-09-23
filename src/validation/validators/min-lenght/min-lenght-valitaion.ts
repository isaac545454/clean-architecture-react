import { InvalidFielError } from '@/validation/errors';
import { FieldValidation } from '@/validation/protocols/field-validation';

export class MinLenthValidation implements FieldValidation {
	constructor(readonly field: string, private readonly minLength: number) {}

	validate(value: string): Error | null {
		return new InvalidFielError();
	}
}
