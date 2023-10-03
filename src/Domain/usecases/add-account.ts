import { AccountModel } from '@/Domain/models/accounts-model'

export type AddAccountParams = {
	email: string
	name: string
	password: string
	passwordConfirmation: string
}

export interface AddAccount {
	add(params: AddAccountParams): Promise<AccountModel>
}
