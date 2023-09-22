/* eslint-disable @typescript-eslint/no-unused-vars */
export interface FieldValidation {
	field: string;
	validate: (value: string) => Error | null;
}
