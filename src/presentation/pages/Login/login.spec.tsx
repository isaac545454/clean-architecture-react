import { render, fireEvent, cleanup, waitFor } from '@testing-library/react'
import { Login } from './Login'
import { SaveAcessTokenMock, ValidationSpy } from '@/presentation/test'
import { faker } from '@faker-js/faker'
import { AuthenticationSpy } from '@/presentation/test/mock-authentication-spy'
import { InvalidCredencialsError } from '@/Domain/error'
import * as Helper from '@/presentation/test/form-helper'
import 'jest-localstorage-mock'
import { SutTypes, TestElementExistsProps, TestElementTextProps, simulateValidSubmitProps } from './interface'

const makeSut = (): SutTypes => {
	const validationSpy = new ValidationSpy()
	const authenticationSpy = new AuthenticationSpy()
	const saveAcessTokenMock = new SaveAcessTokenMock()

	const sut = render(
		<Login validation={validationSpy} authentication={authenticationSpy} saveAccessToken={saveAcessTokenMock} />,
	)
	return {
		sut,
		validationSpy,
		authenticationSpy,
		saveAcessTokenMock,
	}
}

const simulateValidSubmit = async ({
	sut,
	email = faker.internet.email(),
	password = faker.internet.password(),
}: simulateValidSubmitProps): Promise<void> => {
	const { getByTestId } = sut

	Helper.populateField({ sut, fielName: 'email', value: email })
	Helper.populateField({ sut, fielName: 'password', value: password })

	const Form = getByTestId('form')
	fireEvent.submit(Form)

	await waitFor(() => Form)
}

const testElementExists = ({ sut, fieldName }: TestElementExistsProps) => {
	const el = sut.getByTestId(fieldName)
	expect(el).toBeTruthy()
}

const testElementText = ({ sut, fieldName, text }: TestElementTextProps) => {
	const el = sut.getByTestId(fieldName)
	expect(el.textContent).toBe(text)
}

describe('<Login />', () => {
	afterEach(cleanup)
	it('Should start with initial state', () => {
		const { sut } = makeSut()
		const errorMessage = 'campo obrigatorio'
		Helper.testChildCount({ count: 0, sut, fieldName: 'error-wrap' })
		Helper.testButtonIsDisabled({ sut, fieldName: 'submit', isDisabled: true })
		Helper.testStatusForFiel({
			sut,
			fielName: 'email',
			errorMessage,
		})
		Helper.testStatusForFiel({
			sut,
			fielName: 'password',
			errorMessage,
		})
	})
	it('Should call validation with correct value', () => {
		const { validationSpy, sut } = makeSut()

		const email = faker.internet.email()
		Helper.populateField({ sut, fielName: 'email', value: email })
		expect(validationSpy.fieldName).toEqual('email')
		expect(validationSpy.fieldValue).toEqual(email)

		const password = faker.internet.password()
		Helper.populateField({ sut, fielName: 'password', value: password })
		expect(validationSpy.fieldName).toEqual('password')
		expect(validationSpy.fieldValue).toEqual(password)
	})
	it('Should show email error if validation  fails', () => {
		const { validationSpy, sut } = makeSut()
		const errorMessage = faker.animal.cat()
		validationSpy.errorMessage = errorMessage

		Helper.populateField({ sut, fielName: 'email' })

		Helper.testStatusForFiel({
			sut,
			fielName: 'email',
			errorMessage,
		})
	})
	it('Should show password error if validation  fails', () => {
		const { sut, validationSpy } = makeSut()

		const errorMessage = faker.animal.cat()
		validationSpy.errorMessage = errorMessage

		Helper.populateField({ sut, fielName: 'password' })

		Helper.testStatusForFiel({
			sut,
			fielName: 'password',
			errorMessage,
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

	it('shold enabled submit button if form is valid', () => {
		const { sut } = makeSut()

		Helper.populateField({ sut, fielName: 'email' })
		Helper.populateField({ sut, fielName: 'password' })
		Helper.testButtonIsDisabled({ isDisabled: false, fieldName: 'submit', sut })
	})
	it(' shold show spinner on submit', async () => {
		const { sut } = makeSut()
		await simulateValidSubmit({ sut })
		testElementExists({ sut, fieldName: 'spinner' })
	})
	it(' shold call Authentication with correct values ', async () => {
		const loginData = {
			email: faker.internet.email(),
			password: faker.internet.password(),
		}
		const { sut, authenticationSpy } = makeSut()

		await simulateValidSubmit({ sut, email: loginData.email, password: loginData.password })

		expect(authenticationSpy.params).toEqual(loginData)
	})
	it(' shold call Authentication only once ', async () => {
		const { sut, authenticationSpy } = makeSut()

		await simulateValidSubmit({ sut })
		await simulateValidSubmit({ sut })

		expect(authenticationSpy.callsCount).toBe(1)
	})
	it(' shold not call Authentication if form is invalid ', () => {
		const { sut, authenticationSpy, validationSpy } = makeSut()
		const errorMessage = faker.animal.cat()
		validationSpy.errorMessage = errorMessage
		Helper.populateField({ sut, fielName: 'email' })
		const FormElement = sut.getByTestId('form')
		fireEvent.submit(FormElement)
		expect(authenticationSpy.callsCount).toBe(0)
	})
	it(' shold present error if Authentication fails ', async () => {
		const { sut, authenticationSpy } = makeSut()
		const invalidCredencialsError = new InvalidCredencialsError()
		jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(invalidCredencialsError))
		await simulateValidSubmit({ sut })
		testElementText({ fieldName: 'main-error', sut, text: invalidCredencialsError.message })
		Helper.testChildCount({ count: 1, sut, fieldName: 'error-wrap' })
	})

	it(' shold call SaveAcessToken on sucess', async () => {
		const { sut, authenticationSpy, saveAcessTokenMock } = makeSut()
		await simulateValidSubmit({ sut })
		expect(saveAcessTokenMock.acessToken).toBe(authenticationSpy.account.accessToken)
	})
})
