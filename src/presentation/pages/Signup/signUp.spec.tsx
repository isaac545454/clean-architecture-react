import { render, cleanup, waitFor, fireEvent } from '@testing-library/react'
import { SignUp } from '.'
import { SimulateValidSubmit } from './interface'
import * as Helper from '@/presentation/test/form-helper'
import { SaveAcessTokenMock, ValidationSpy } from '@/presentation/test'
import { faker } from '@faker-js/faker'
import { AddAccountSpy } from '@/presentation/test/mock-add-account'
import { EmailInUserError } from '@/Domain/error'

const makeSut = (errorMessage?: string) => {
	const validationSpy = new ValidationSpy()
	const addAccountSpy = new AddAccountSpy()
	const saveAcessTokenMock = new SaveAcessTokenMock()

	if (errorMessage) {
		validationSpy.errorMessage = errorMessage
	}
	const sut = render(
		<SignUp validation={validationSpy} addAccount={addAccountSpy} saveAccessToken={saveAcessTokenMock} />,
	)
	return {
		sut,
		validationSpy,
		addAccountSpy,
		saveAcessTokenMock,
	}
}

export const simulateValidSubmit = async ({
	sut,
	email = faker.internet.email(),
	password,
	name = faker.person.firstName(),
	confirmation,
}: SimulateValidSubmit): Promise<void> => {
	const { getByTestId } = sut
	const passwordGenerate = faker.internet.password()
	Helper.populateField({ sut, fielName: 'name', value: name })
	Helper.populateField({ sut, fielName: 'email', value: email })
	Helper.populateField({ sut, fielName: 'password', value: password ?? passwordGenerate })
	Helper.populateField({ sut, fielName: 'confirmation', value: confirmation ?? passwordGenerate })
	const Form = getByTestId('form')
	fireEvent.submit(Form)
	await waitFor(() => Form)
}

describe('<SignUp />', () => {
	afterEach(cleanup)
	test('Should start with initial state', () => {
		const required = 'campo obrigatorio'
		const { sut } = makeSut(required)
		Helper.testChildCount({ count: 0, sut, fieldName: 'error-wrap' })
		Helper.testButtonIsDisabled({ sut, fieldName: 'submit', isDisabled: true })
		Helper.testStatusForFiel({
			sut,
			fielName: 'name',
			errorMessage: required,
		})
		Helper.testStatusForFiel({
			sut,
			fielName: 'email',
			errorMessage: required,
		})
		Helper.testStatusForFiel({
			sut,
			fielName: 'password',
			errorMessage: required,
		})
		Helper.testStatusForFiel({
			sut,
			fielName: 'confirmation',
			errorMessage: required,
		})
	})
	it('Should call name validation with correct fails', () => {
		const validateError = 'campo obrigatorio'
		const { sut } = makeSut(validateError)
		Helper.populateField({ sut, fielName: 'name' })
		Helper.testStatusForFiel({ sut, fielName: 'name', errorMessage: validateError })
	})
	it('Should call email validation with correct fails', () => {
		const validateError = 'campo obrigatorio'
		const { sut } = makeSut(validateError)
		Helper.populateField({ sut, fielName: 'email' })
		Helper.testStatusForFiel({ sut, fielName: 'email', errorMessage: validateError })
	})
	it('Should call password validation with correct fails', () => {
		const validateError = 'campo obrigatorio'
		const { sut } = makeSut(validateError)
		Helper.populateField({ sut, fielName: 'password' })
		Helper.testStatusForFiel({ sut, fielName: 'password', errorMessage: validateError })
	})
	it('Should call confirmation validation with correct fails', () => {
		const validateError = 'campo obrigatorio'
		const { sut } = makeSut(validateError)
		Helper.populateField({ sut, fielName: 'confirmation' })
		Helper.testStatusForFiel({ sut, fielName: 'confirmation', errorMessage: validateError })
	})
	it('Should show valid name state if validation succeeds', () => {
		const { sut } = makeSut()
		Helper.populateField({ sut, fielName: 'name' })
		Helper.testStatusForFiel({
			sut,
			fielName: 'name',
		})
	})
	it('Should show valid email state if validation succeeds', () => {
		const { sut } = makeSut()
		Helper.populateField({ sut, fielName: 'email' })
		Helper.testStatusForFiel({
			sut,
			fielName: 'email',
		})
	})
	it('Should show valid password state if validation succeeds', () => {
		const { sut } = makeSut()
		Helper.populateField({ sut, fielName: 'password' })
		Helper.testStatusForFiel({
			sut,
			fielName: 'password',
		})
	})
	it('Should show valid confirmation state if validation succeeds', () => {
		const { sut } = makeSut()
		Helper.populateField({ sut, fielName: 'confirmation' })
		Helper.testStatusForFiel({
			sut,
			fielName: 'confirmation',
		})
	})
	it('shold enabled submit button if form is valid', () => {
		const { sut } = makeSut()
		Helper.populateField({ sut, fielName: 'name' })
		Helper.populateField({ sut, fielName: 'email' })
		Helper.populateField({ sut, fielName: 'password' })
		Helper.populateField({ sut, fielName: 'confirmation' })
		Helper.testButtonIsDisabled({ isDisabled: false, fieldName: 'submit', sut })
	})
	it(' shold show spinner on submit', async () => {
		const { sut } = makeSut()
		await simulateValidSubmit({ sut })
		Helper.testElementExists({ sut, fieldName: 'spinner' })
	})
	it(' shold call AddAccount with correct values ', async () => {
		const CreatedPassword = faker.internet.password()
		const createUser = {
			name: faker.person.firstName(),
			email: faker.internet.email(),
			password: CreatedPassword,
			confirmation: CreatedPassword,
		}
		const { sut, addAccountSpy } = makeSut()

		await simulateValidSubmit({
			sut,
			email: createUser.email,
			password: createUser.password,
			name: createUser.name,
			confirmation: createUser.confirmation,
		})

		expect(addAccountSpy.params).toEqual(createUser)
	})
	it(' shold call addAccount only once ', async () => {
		const { sut, addAccountSpy } = makeSut()

		await simulateValidSubmit({ sut })
		await simulateValidSubmit({ sut })

		expect(addAccountSpy.callsCount).toBe(1)
	})
	it(' shold not call addAccount if form is invalid ', () => {
		const { sut, addAccountSpy, validationSpy } = makeSut()
		const errorMessage = faker.animal.cat()
		validationSpy.errorMessage = errorMessage
		Helper.populateField({ sut, fielName: 'email' })
		const FormElement = sut.getByTestId('form')
		fireEvent.submit(FormElement)
		expect(addAccountSpy.callsCount).toBe(0)
	})
	it(' shold present error if addAccount fails ', async () => {
		const { sut, addAccountSpy } = makeSut()
		const invalidCredencialsError = new EmailInUserError()
		jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(invalidCredencialsError)
		await simulateValidSubmit({ sut })
		Helper.testElementText({ fieldName: 'main-error', sut, text: invalidCredencialsError.message })
		Helper.testChildCount({ count: 1, sut, fieldName: 'error-wrap' })
	})
	it(' shold call SaveAcessToken on sucess', async () => {
		const { sut, addAccountSpy, saveAcessTokenMock } = makeSut()
		await simulateValidSubmit({ sut })
		expect(saveAcessTokenMock.acessToken).toBe(addAccountSpy.account.accessToken)
	})
})
