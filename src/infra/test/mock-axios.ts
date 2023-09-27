import axios from 'axios';
import { faker } from '@faker-js/faker';

export const mockHttpResponse = () => ({
	data: faker.person.firstName(),
	status: faker.number.int(),
});

export const mockdAxios = (): jest.Mocked<typeof axios> => {
	const mockedAxios = axios as jest.Mocked<typeof axios>;
	mockedAxios.post.mockResolvedValue(mockHttpResponse());
	return mockedAxios;
};
