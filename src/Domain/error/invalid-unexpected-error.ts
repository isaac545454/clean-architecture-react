export class UnexpectedError extends Error {
    constructor() {
        super("algo de errado aconteceu. tente novamente mais tarde")
        this.name = "UnexpectedError"
    }
}