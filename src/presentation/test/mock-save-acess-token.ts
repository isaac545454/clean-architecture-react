import { SaveAcessToken } from '@/Domain/usecases/save-acess-token';

export class SaveAcessTokenMock implements SaveAcessToken {
	acessToken: string = '';

	async save(acessToken: string): Promise<void> {
		this.acessToken = acessToken;
	}
}
