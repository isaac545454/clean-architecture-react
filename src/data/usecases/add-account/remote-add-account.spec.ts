import { mockAddAccountParams } from '@/Domain/test';
import { faker } from '@faker-js/faker';
import { RemoteAddAccount } from './remote-add-account';
import { AddAccountParams } from '@/Domain/usecases';
import { AccountModel } from '@/Domain/models';
import { HttpPostClientSpy } from '@/data/test';

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
});