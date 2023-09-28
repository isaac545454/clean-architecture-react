export class EmailInUserError extends Error {
	constructor() {
		super('esse e-mail já está em uso');
		this.name = 'EmailInUserError';
	}
}
