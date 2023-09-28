import { EmailInUserError, UnexpectedError } from '@/Domain/error';
import { AccountModel } from '@/Domain/models';
import { AddAccount, AddAccountParams } from '@/Domain/usecases';
import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http';

export class RemoteAddAccount implements AddAccount {
	constructor(
		private readonly url: string,
		private readonly httpPostClient: HttpPostClient<AddAccountParams, AccountModel>,
	) {}

	async add(params: AddAccountParams): Promise<AccountModel> {
		const response = await this.httpPostClient.post({ url: this.url, body: params });

		switch (response.statusCode) {
			case HttpStatusCode.ok:
				return response.body;
			case HttpStatusCode.forbidden:
				throw new EmailInUserError();
			default:
				throw new UnexpectedError();
		}
	}
}
