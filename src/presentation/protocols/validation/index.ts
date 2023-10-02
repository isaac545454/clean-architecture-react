export interface Valitation {
	validate(fieldName: string, input: object): string | null
}
