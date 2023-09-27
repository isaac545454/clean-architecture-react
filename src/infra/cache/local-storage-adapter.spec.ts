import { faker } from '@faker-js/faker';
import 'jest-localstorage-mock';
import { LocalStorageAdapter } from './local-storage-adapter';

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter();

describe('LocalStorageAdapter', () => {
	beforeEach(() => {
		localStorage.clear();
	});
	test('should call localStorage with correct values', async () => {
		const sut = makeSut();
		const key = faker.database.column();
		const value = faker.database.mongodbObjectId();
		await sut.set(key, value);
		expect(localStorage.setItem).toHaveBeenCalledWith(key, value);
	});
});
