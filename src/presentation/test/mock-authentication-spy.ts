import { AccountModel } from '@/Domain/models';
import { mockAccountModel } from '@/Domain/test';
import { Authentication, AuthenticationParams } from '@/Domain/usecases';

export class AuthenticationSpy implements Authentication {
	account = mockAccountModel();
	params: AuthenticationParams | undefined;

	async auth(params: AuthenticationParams): Promise<AccountModel> {
		this.params = params;
		return Promise.resolve(this.account);
	}
}
