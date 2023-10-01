import { Valitation } from '@/presentation/protocols/validation'
import { RenderResult } from '@testing-library/react'
import { AddAccount, SaveAcessToken } from '@/Domain/usecases'

export type SignUpProps = {
	validation: Valitation
	addAccount: AddAccount
	saveAccessToken: SaveAcessToken
}

export type SimulateValidSubmit = {
	sut: RenderResult
	email?: string
	password?: string
	name?: string
	confirmation?: string
}
