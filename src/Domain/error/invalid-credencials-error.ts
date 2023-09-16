export class InvalidCredencialsError extends Error {
    constructor() {
        super("Credenciais invalidas")
        this.name = "InvalidCredencialsError"
    }
}