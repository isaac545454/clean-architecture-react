import { faker } from "@faker-js/faker"
import { HttpPostParams } from "../protocols/http"

export const mockedPostRequest = (): HttpPostParams<unknown> => {
    return {
        url: faker.internet.url(),
        body: {
            name: faker.person.firstName()
        }
    }
}