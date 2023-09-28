import { mockAddAccountParams } from '@/Domain/test';
import { faker } from '@faker-js/faker';
import { RemoteAddAccount } from './remote-add-account';
import { AddAccountParams } from '@/Domain/usecases';
import { AccountModel } from '@/Domain/models';
import { HttpPostClientSpy } from '@/data/test';
import { HttpStatusCode } from '@/data/protocols/http';
import { EmailInUserError, UnexpectedError } from '@/Domain/error';

type SutTypes = {
	sut: RemoteAddAccount;
	httpPostClientSpy: HttpPostClientSpy<AddAccountParams, AccountModel>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
	const httpPostClientSpy = new HttpPostClientSpy<AddAccountParams, AccountModel>();
	const sut = new RemoteAddAccount(url, httpPostClientSpy);

	return {
		sut,
		httpPostClientSpy,
	};
};

describe('RemoteAddAccount', () => {
	test('Should call httpPostClient with correct URL', async () => {
		const url = faker.internet.url();
		const { sut, httpPostClientSpy } = makeSut(url);
		await sut.add(mockAddAccountParams());
		expect(httpPostClientSpy.url).toBe(url);
	});

	test('Should call httpPostClient with correct body', async () => {
		const { sut, httpPostClientSpy } = makeSut();
		const AddAccountParams = mockAddAccountParams();
		await sut.add(AddAccountParams);
		expect(httpPostClientSpy.body).toEqual(AddAccountParams);
	});
	test('Should throw EmailInError if InvalidCredentialsError if httpPostClient return 403', async () => {
		const { sut, httpPostClientSpy } = makeSut();
		httpPostClientSpy.response = {
			statusCode: HttpStatusCode.forbidden,
		};
		const promise = sut.add(mockAddAccountParams());
		await expect(promise).rejects.toThrow(new EmailInUserError());
	});
	test('Should throw UnexpectedError if httpPostClient return 400', async () => {
		const { sut, httpPostClientSpy } = makeSut();
		httpPostClientSpy.response = {
			statusCode: HttpStatusCode.badRequest,
		};
		const promise = sut.add(mockAddAccountParams());
		await expect(promise).rejects.toThrow(new UnexpectedError());
	});
	test('Should throw UnexpectedError if httpPostClient return 500', async () => {
		const { sut, httpPostClientSpy } = makeSut();
		httpPostClientSpy.response = {
			statusCode: HttpStatusCode.serverError,
		};
		const promise = sut.add(mockAddAccountParams());
		await expect(promise).rejects.toThrow(new UnexpectedError());
	});

	test('Should throw UnexpectedError if httpPostClient return 404', async () => {
		const { sut, httpPostClientSpy } = makeSut();
		httpPostClientSpy.response = {
			statusCode: HttpStatusCode.notFound,
		};
		const promise = sut.add(mockAddAccountParams());
		await expect(promise).rejects.toThrow(new UnexpectedError());
	});
});
