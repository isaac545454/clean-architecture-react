import { RenderResult, render, fireEvent, cleanup } from '@testing-library/react';
import { Login } from './Login';
import { ValidationSpy } from '@/presentation/test';
import { faker } from '@faker-js/faker';

type SutTypes = {
	sut: RenderResult;
	validationSpy: ValidationSpy;
};

const makeSut = (): SutTypes => {
	const validationSpy = new ValidationSpy();
	const sut = render(<Login validation={validationSpy} />);
	return {
		sut,
		validationSpy,
	};
};

describe('<Login />', () => {
	afterEach(cleanup);
	it('Should start with initial state', () => {
		const { sut } = makeSut();
		const { getByTestId } = sut;

		const errorWrap = getByTestId('error-wrap');
		expect(errorWrap.childElementCount).toBe(0);

		const ButtonSubmit = getByTestId('submit') as HTMLButtonElement;
		expect(ButtonSubmit.disabled).toBe(true);

		const StatusEmail = getByTestId('email-status');
		expect(StatusEmail.title).toBe('campo obrigatorio');
		expect(StatusEmail.textContent).toBe('🔴');

		const StatusPassword = getByTestId('password-status');
		expect(StatusPassword.title).toBe('campo obrigatorio');
		expect(StatusPassword.textContent).toBe('🔴');
	});
	it('Should call validation with correct value', () => {
		const {
			sut: { getByTestId },
			validationSpy,
		} = makeSut();

		const emailInput = getByTestId('email');
		const email = faker.internet.email();

		const passwordInput = getByTestId('password');
		const password = faker.internet.password();

		fireEvent.input(emailInput, { target: { value: email } });
		expect(validationSpy.fieldName).toEqual('email');
		expect(validationSpy.fieldValue).toEqual(email);

		fireEvent.input(passwordInput, { target: { value: password } });
		expect(validationSpy.fieldName).toEqual('password');
		expect(validationSpy.fieldValue).toEqual(password);
	});
	it('Should show email error if validation  fails', () => {
		const {
			sut: { getByTestId },
			validationSpy,
		} = makeSut();

		const errorMessage = faker.animal.cat();
		validationSpy.errorMessage = errorMessage;

		const emailInput = getByTestId('email');

		fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
		const emailStatus = getByTestId('email-status');
		expect(emailStatus.title).toBe(errorMessage);
		expect(emailStatus.textContent).toBe('🔴');
	});
	it('Should show password error if validation  fails', () => {
		const {
			sut: { getByTestId },
			validationSpy,
		} = makeSut();

		const errorMessage = faker.animal.cat();
		validationSpy.errorMessage = errorMessage;
		const passwordInput = getByTestId('password');
		fireEvent.input(passwordInput, { target: { value: faker.internet.email() } });
		const passwordStatus = getByTestId('password-status');
		expect(passwordStatus.title).toBe(errorMessage);
		expect(passwordStatus.textContent).toBe('🔴');
	});
	it('Should show valid email state if validation succeeds', () => {
		const {
			sut: { getByTestId },
			validationSpy,
		} = makeSut();

		validationSpy.errorMessage = '';

		const emailInput = getByTestId('email');

		fireEvent.input(emailInput, { target: { value: faker.internet.password() } });
		const emailStatus = getByTestId('email-status');
		expect(emailStatus.title).toBe('tudo certo');
		expect(emailStatus.textContent).toBe('🟢');
	});
	it('Should show valid password state if validation succeeds', () => {
		const {
			sut: { getByTestId },
			validationSpy,
		} = makeSut();

		validationSpy.errorMessage = '';

		const passwordInput = getByTestId('password');

		fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });
		const passwordStatus = getByTestId('password-status');
		expect(passwordStatus.title).toBe('tudo certo');
		expect(passwordStatus.textContent).toBe('🟢');
	});
});
