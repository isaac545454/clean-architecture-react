/* eslint-disable @typescript-eslint/no-unused-vars */
export interface FieldValidation {
	field: string
	validate: (input: object) => Error | null
}
