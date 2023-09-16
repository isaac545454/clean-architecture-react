import axios from 'axios'
import { faker } from "@faker-js/faker"

export const mockdAxios = (): jest.Mocked<typeof axios> => {
    const mockedAxios = axios as jest.Mocked<typeof axios>
    mockedAxios.post.mockResolvedValue({
        data: faker.person.firstName(),
        status: faker.number.int()
    })
    return mockedAxios
}