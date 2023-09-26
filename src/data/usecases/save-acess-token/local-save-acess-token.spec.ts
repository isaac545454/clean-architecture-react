import { faker } from '@faker-js/faker';
import { LocalSaveAcessToken } from './local-save-acess-token';
import { SetStorageSpy } from '@/data/test';

type makeSutTypes = {
	sut: LocalSaveAcessToken;
	setStorageSpy: SetStorageSpy;
};

const makeSut = (): makeSutTypes => {
	const setStorageSpy = new SetStorageSpy();
	const sut = new LocalSaveAcessToken(setStorageSpy);

	return {
		sut,
		setStorageSpy,
	};
};

describe('LocalSaveAcessToken', () => {
	test('should call setStorage with correct value', async () => {
		const { setStorageSpy, sut } = makeSut();
		const acessToken = faker.database.mongodbObjectId();
		await sut.save(acessToken);
		expect(setStorageSpy.key).toBe('acessToken');
		expect(setStorageSpy.value).toBe(acessToken);
	});
});
