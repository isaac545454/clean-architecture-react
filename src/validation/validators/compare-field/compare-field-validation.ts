import { InvalidFielError } from '@/validation/errors';

export class CompareFieldsValidation {
	constructor(readonly field: string, private readonly valueToCompare: string) {}

	validate(value: string): Error | null {
		if (value !== this.valueToCompare) return new InvalidFielError();
		return null;
	}
}
