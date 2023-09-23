import { FieldValidation } from '@/validation/protocols/field-validation';
import { RequiredFieldValidation } from '../required-field/required-field-validation';
import { EmailValidation } from '../email/email-validation';
import { MinLenthValidation } from '../min-lenght/min-lenght-valitaion';

export class ValidationBuilder {
	private constructor(private readonly fielName: string, private readonly validations: FieldValidation[]) {}

	static field(fieldName: string): ValidationBuilder {
		return new ValidationBuilder(fieldName, []);
	}

	required(): ValidationBuilder {
		this.validations.push(new RequiredFieldValidation(this.fielName));
		return this;
	}

	email(): ValidationBuilder {
		this.validations.push(new EmailValidation(this.fielName));
		return this;
	}

	min(lenght: number): ValidationBuilder {
		this.validations.push(new MinLenthValidation(this.fielName, lenght));
		return this;
	}

	build(): FieldValidation[] {
		return this.validations;
	}
}
