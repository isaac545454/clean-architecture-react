import { SaveAcessToken } from '@/Domain/usecases/save-acess-token';
import { SetStorage } from '@/data/protocols/cache/set-storage';

export class LocalSaveAcessToken implements SaveAcessToken {
	constructor(private readonly setStorage: SetStorage) {}

	async save(acessToken: string): Promise<void> {
		return await this.setStorage.set('acessToken', acessToken);
	}
}
