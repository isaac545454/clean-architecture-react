import { faker } from "@faker-js/faker"
import { AuthenticationParams } from "@/Domain/usecases/authentication"
import { AccountModel } from "@/Domain/models"

export const mockAuthentication = (): AuthenticationParams => {
    return {
        email: faker.internet.email(),
        password: faker.internet.password()
    }
}

export const mockAccountModel = (): AccountModel => {
    return {
        accessToken: String(faker.number.float())
    }
}