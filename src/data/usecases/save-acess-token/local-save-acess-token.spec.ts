import { faker } from '@faker-js/faker';
import { LocalSaveAcessToken } from './local-save-acess-token';
import { SetStorageMock } from '@/data/test';

type makeSutTypes = {
	sut: LocalSaveAcessToken;
	setStorageMock: SetStorageMock;
};

const makeSut = (): makeSutTypes => {
	const setStorageMock = new SetStorageMock();
	const sut = new LocalSaveAcessToken(setStorageMock);

	return {
		sut,
		setStorageMock,
	};
};

describe('LocalSaveAcessToken', () => {
	test('should call setStorage with correct value', async () => {
		const { setStorageMock, sut } = makeSut();
		const acessToken = faker.database.mongodbObjectId();
		await sut.save(acessToken);
		expect(setStorageMock.key).toBe('acessToken');
		expect(setStorageMock.value).toBe(acessToken);
	});
	test('should throw if setStorage throws', async () => {
		const { setStorageMock, sut } = makeSut();
		jest.spyOn(setStorageMock, 'set').mockRejectedValueOnce(new Error());
		const promise = sut.save(faker.database.mongodbObjectId());
		await expect(promise).rejects.toThrow(new Error());
	});
});
