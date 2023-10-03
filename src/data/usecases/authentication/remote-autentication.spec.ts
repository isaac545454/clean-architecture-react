import { RemoteAuthentication } from './remote-authentication'
import { mockAccountModel, mockAuthentication } from '@/Domain/test'
import { HttpPostClientSpy } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError, InvalidCredencialsError } from '@/Domain/error'
import { AuthenticationParams } from '@/Domain/usecases'
import { AccountModel } from '@/Domain/models'
import { faker } from '@faker-js/faker'

type SutTypes = {
	sut: RemoteAuthentication
	httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
	const httpPostClientSpy = new HttpPostClientSpy<AuthenticationParams, AccountModel>()
	const sut = new RemoteAuthentication(url, httpPostClientSpy)

	return {
		sut,
		httpPostClientSpy,
	}
}

describe('RemoteAuthentication', () => {
	test('Should call httpPostClient with correct URL', async () => {
		const url = faker.internet.url()
		const { sut, httpPostClientSpy } = makeSut(url)
		await sut.auth(mockAuthentication())
		expect(httpPostClientSpy.url).toBe(url)
	})

	test('Should call httpPostClient with correct body', async () => {
		const { sut, httpPostClientSpy } = makeSut()
		const AuthenticationParams = mockAuthentication()
		await sut.auth(AuthenticationParams)
		expect(httpPostClientSpy.data).toEqual(AuthenticationParams)
	})

	test('Should throw InvalidCredentialsError if httpPostClient return 401', async () => {
		const { sut, httpPostClientSpy } = makeSut()
		httpPostClientSpy.response = {
			status: HttpStatusCode.unauthorized,
		}
		const promise = sut.auth(mockAuthentication())
		await expect(promise).rejects.toThrow(new InvalidCredencialsError())
	})

	test('Should throw UnexpectedError if httpPostClient return 400', async () => {
		const { sut, httpPostClientSpy } = makeSut()
		httpPostClientSpy.response = {
			status: HttpStatusCode.badRequest,
		}
		const promise = sut.auth(mockAuthentication())
		await expect(promise).rejects.toThrow(new UnexpectedError())
	})

	test('Should throw UnexpectedError if httpPostClient return 500', async () => {
		const { sut, httpPostClientSpy } = makeSut()
		httpPostClientSpy.response = {
			status: HttpStatusCode.serverError,
		}
		const promise = sut.auth(mockAuthentication())
		await expect(promise).rejects.toThrow(new UnexpectedError())
	})

	test('Should throw UnexpectedError if httpPostClient return 404', async () => {
		const { sut, httpPostClientSpy } = makeSut()
		httpPostClientSpy.response = {
			status: HttpStatusCode.notFound,
		}
		const promise = sut.auth(mockAuthentication())
		await expect(promise).rejects.toThrow(new UnexpectedError())
	})

	test('Should Return an AccountModel if httpPostClient return 200', async () => {
		const { sut, httpPostClientSpy } = makeSut()
		const httpResult = mockAccountModel()
		httpPostClientSpy.response = {
			status: HttpStatusCode.ok,
			data: httpResult,
		}
		const account = await sut.auth(mockAuthentication())
		await expect(account).toEqual(httpResult)
	})
})
