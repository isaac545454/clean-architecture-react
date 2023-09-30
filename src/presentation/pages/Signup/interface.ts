import { Valitation } from '@/presentation/protocols/validation'
import { ValidationSpy } from '@/presentation/test'
import { RenderResult } from '@testing-library/react'
import { AddAccount } from '@/Domain/usecases'
import { AddAccountSpy } from '@/presentation/test/mock-add-account'

export type SignUpProps = {
	validation: Valitation
	addAccount: AddAccount
}

export type SutTypes = {
	sut: RenderResult
	validationSpy: ValidationSpy
	addAccountSpy: AddAccountSpy
}

export type SimulateValidSubmit = {
	sut: RenderResult
	email?: string
	password?: string
	name?: string
	confirmation?: string
}
