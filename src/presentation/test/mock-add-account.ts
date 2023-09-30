import { AccountModel } from '@/Domain/models'
import { mockAccountModel } from '@/Domain/test'
import { AddAccount, AddAccountParams } from '@/Domain/usecases'

export class AddAccountSpy implements AddAccount {
	account = mockAccountModel()
	params: AddAccountParams | undefined
	callsCount = 0

	async add(params: AddAccountParams): Promise<AccountModel> {
		this.params = params
		this.callsCount++
		return this.account
	}
}
