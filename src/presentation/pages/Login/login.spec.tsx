import { RenderResult, render, fireEvent, cleanup } from '@testing-library/react';
import { Login } from './Login';
import { ValidationSpy } from '@/presentation/test';
import { faker } from '@faker-js/faker';
import { AuthenticationSpy } from '@/presentation/test/mock-authentication-spy';

type SutTypes = {
	sut: RenderResult;
	validationSpy: ValidationSpy;
	authenticationSpy: AuthenticationSpy;
};

const makeSut = (): SutTypes => {
	const validationSpy = new ValidationSpy();
	const authenticationSpy = new AuthenticationSpy();
	const sut = render(<Login validation={validationSpy} authenticationSpy={authenticationSpy} />);
	return {
		sut,
		validationSpy,
		authenticationSpy,
	};
};

type simulateValidSubmitProps = {
	sut: RenderResult;
	email?: string;
	password?: string;
};

const simulateValidSubmit = ({
	sut,
	email = faker.internet.email(),
	password = faker.internet.password(),
}: simulateValidSubmitProps): void => {
	const { getByTestId } = sut;
	populateEmailField({ sut, email });
	populatePasswordField({ sut, password });

	const ButtonSubmit = getByTestId('submit');
	fireEvent.click(ButtonSubmit);
};

const populateEmailField = ({ sut: { getByTestId }, email = faker.internet.email() }: simulateValidSubmitProps) => {
	const emailInput = getByTestId('email');
	fireEvent.input(emailInput, { target: { value: email } });
};

const populatePasswordField = ({
	sut: { getByTestId },
	password = faker.internet.password(),
}: simulateValidSubmitProps) => {
	const passwordInput = getByTestId('password');
	fireEvent.input(passwordInput, { target: { value: password } });
};

type SimulateStatusForFielProps = {
	sut: RenderResult;
	fielName: string;
	errorMessage?: string;
};

const simulateStatusForFiel = ({ sut, fielName, errorMessage }: SimulateStatusForFielProps) => {
	const StatusEmail = sut.getByTestId(`${fielName}-status`);
	expect(StatusEmail.title).toBe(errorMessage || 'tudo certo');
	expect(StatusEmail.textContent).toBe(errorMessage ? '🔴' : '🟢');
};

describe('<Login />', () => {
	afterEach(cleanup);
	it('Should start with initial state', () => {
		const { sut } = makeSut();
		const { getByTestId } = sut;
		const errorMessage = 'campo obrigatorio';

		const errorWrap = getByTestId('error-wrap');
		expect(errorWrap.childElementCount).toBe(0);

		const ButtonSubmit = getByTestId('submit') as HTMLButtonElement;
		expect(ButtonSubmit.disabled).toBe(true);

		simulateStatusForFiel({
			sut,
			fielName: 'email',
			errorMessage,
		});

		simulateStatusForFiel({
			sut,
			fielName: 'password',
			errorMessage,
		});
	});
	it('Should call validation with correct value', () => {
		const { validationSpy, sut } = makeSut();

		const email = faker.internet.email();
		populateEmailField({ sut, email });
		expect(validationSpy.fieldName).toEqual('email');
		expect(validationSpy.fieldValue).toEqual(email);

		const password = faker.internet.password();
		populatePasswordField({ sut, password });
		expect(validationSpy.fieldName).toEqual('password');
		expect(validationSpy.fieldValue).toEqual(password);
	});
	it('Should show email error if validation  fails', () => {
		const { validationSpy, sut } = makeSut();

		const errorMessage = faker.animal.cat();
		validationSpy.errorMessage = errorMessage;

		populateEmailField({ sut });

		simulateStatusForFiel({
			sut,
			fielName: 'email',
			errorMessage,
		});
	});
	it('Should show password error if validation  fails', () => {
		const { sut, validationSpy } = makeSut();

		const errorMessage = faker.animal.cat();
		validationSpy.errorMessage = errorMessage;

		populatePasswordField({ sut });

		simulateStatusForFiel({
			sut,
			fielName: 'password',
			errorMessage,
		});
	});
	it('Should show valid email state if validation succeeds', () => {
		const { sut } = makeSut();
		populateEmailField({ sut });
		simulateStatusForFiel({
			sut,
			fielName: 'email',
		});
	});
	it('Should show valid password state if validation succeeds', () => {
		const { sut } = makeSut();
		populatePasswordField({ sut });
		simulateStatusForFiel({
			sut,
			fielName: 'password',
		});
	});

	it('shold enabled submit button if form is valid', () => {
		const { sut } = makeSut();

		populateEmailField({ sut });
		populatePasswordField({ sut });

		const ButtonSubmit = sut.getByTestId('submit') as HTMLButtonElement;
		expect(ButtonSubmit.disabled).toBe(false);
	});
	it(' shold show spinner on submit', () => {
		const { sut } = makeSut();
		simulateValidSubmit({ sut });

		const spinner = sut.getByTestId('spinner');
		expect(spinner).toBeTruthy();
	});
	it(' shold call Authentication with correct values ', () => {
		const loginData = {
			email: faker.internet.email(),
			password: faker.internet.password(),
		};
		const { sut, authenticationSpy } = makeSut();

		simulateValidSubmit({ sut, email: loginData.email, password: loginData.password });

		expect(authenticationSpy.params).toEqual(loginData);
	});
	it(' shold call Authentication only once ', () => {
		const { sut, authenticationSpy } = makeSut();

		simulateValidSubmit({ sut });
		simulateValidSubmit({ sut });

		expect(authenticationSpy.callsCount).toBe(1);
	});
});
