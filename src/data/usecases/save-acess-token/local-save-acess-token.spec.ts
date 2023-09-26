import { faker } from '@faker-js/faker';
import { LocalSaveAcessToken } from './local-save-acess-token';
import { SetStorageSpy } from '@/data/test';

describe('LocalSaveAcessToken', () => {
	test('should call setStorage with correct value', async () => {
		const setStorageSpy = new SetStorageSpy();
		const sut = new LocalSaveAcessToken(setStorageSpy);
		const acessToken = faker.database.mongodbObjectId();
		await sut.save(acessToken);
		expect(setStorageSpy.key).toBe('acessToken');
		expect(setStorageSpy.value).toBe(acessToken);
	});
});
