import { render, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { Login } from './Login';
import { SaveAcessTokenMock, ValidationSpy } from '@/presentation/test';
import { faker } from '@faker-js/faker';
import { AuthenticationSpy } from '@/presentation/test/mock-authentication-spy';
import { InvalidCredencialsError } from '@/Domain/error';
import 'jest-localstorage-mock';
import {
	SimulateStatusForFielProps,
	SutTypes,
	TestButtonIsDisabledProps,
	TestElementExistsProps,
	TestElementTextProps,
	simulateValidSubmitProps,
	testErrorWrapChildCountProps,
} from './interface';

const makeSut = (): SutTypes => {
	const validationSpy = new ValidationSpy();
	const authenticationSpy = new AuthenticationSpy();
	const saveAcessTokenMock = new SaveAcessTokenMock();

	const sut = render(
		<Login validation={validationSpy} authentication={authenticationSpy} saveAccessToken={saveAcessTokenMock} />,
	);
	return {
		sut,
		validationSpy,
		authenticationSpy,
		saveAcessTokenMock,
	};
};

const simulateValidSubmit = async ({
	sut,
	email = faker.internet.email(),
	password = faker.internet.password(),
}: simulateValidSubmitProps): Promise<void> => {
	const { getByTestId } = sut;

	populateEmailField({ sut, email });
	populatePasswordField({ sut, password });

	const Form = getByTestId('form');
	fireEvent.submit(Form);

	await waitFor(() => Form);
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

const testStatusForFiel = ({ sut, fielName, errorMessage }: SimulateStatusForFielProps) => {
	const StatusEmail = sut.getByTestId(`${fielName}-status`);
	expect(StatusEmail.title).toBe(errorMessage || 'tudo certo');
	expect(StatusEmail.textContent).toBe(errorMessage ? '🔴' : '🟢');
};

const testErrorWrapChildCount = ({ sut, count }: testErrorWrapChildCountProps) => {
	const errorWrap = sut.getByTestId('error-wrap');
	expect(errorWrap.childElementCount).toBe(count);
};

const testElementExists = ({ sut, fieldName }: TestElementExistsProps) => {
	const el = sut.getByTestId(fieldName);
	expect(el).toBeTruthy();
};

const testElementText = ({ sut, fieldName, text }: TestElementTextProps) => {
	const el = sut.getByTestId(fieldName);
	expect(el.textContent).toBe(text);
};

const testButtonIsDisabled = ({ sut, fieldName, isDisabled }: TestButtonIsDisabledProps) => {
	const button = sut.getByTestId(fieldName) as HTMLButtonElement;
	expect(button.disabled).toBe(isDisabled);
};

describe('<Login />', () => {
	afterEach(cleanup);
	it('Should start with initial state', () => {
		const { sut } = makeSut();
		const errorMessage = 'campo obrigatorio';
		testErrorWrapChildCount({ count: 0, sut });
		testButtonIsDisabled({ sut, fieldName: 'submit', isDisabled: true });
		testStatusForFiel({
			sut,
			fielName: 'email',
			errorMessage,
		});
		testStatusForFiel({
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

		testStatusForFiel({
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

		testStatusForFiel({
			sut,
			fielName: 'password',
			errorMessage,
		});
	});
	it('Should show valid email state if validation succeeds', () => {
		const { sut } = makeSut();
		populateEmailField({ sut });
		testStatusForFiel({
			sut,
			fielName: 'email',
		});
	});
	it('Should show valid password state if validation succeeds', () => {
		const { sut } = makeSut();
		populatePasswordField({ sut });
		testStatusForFiel({
			sut,
			fielName: 'password',
		});
	});

	it('shold enabled submit button if form is valid', () => {
		const { sut } = makeSut();

		populateEmailField({ sut });
		populatePasswordField({ sut });
		testButtonIsDisabled({ isDisabled: false, fieldName: 'submit', sut });
	});
	it(' shold show spinner on submit', async () => {
		const { sut } = makeSut();
		await simulateValidSubmit({ sut });
		testElementExists({ sut, fieldName: 'spinner' });
	});
	it(' shold call Authentication with correct values ', async () => {
		const loginData = {
			email: faker.internet.email(),
			password: faker.internet.password(),
		};
		const { sut, authenticationSpy } = makeSut();

		await simulateValidSubmit({ sut, email: loginData.email, password: loginData.password });

		expect(authenticationSpy.params).toEqual(loginData);
	});
	it(' shold call Authentication only once ', async () => {
		const { sut, authenticationSpy } = makeSut();

		await simulateValidSubmit({ sut });
		await simulateValidSubmit({ sut });

		expect(authenticationSpy.callsCount).toBe(1);
	});
	it(' shold not call Authentication if form is invalid ', () => {
		const { sut, authenticationSpy, validationSpy } = makeSut();

		const errorMessage = faker.animal.cat();
		validationSpy.errorMessage = errorMessage;

		populateEmailField({ sut });

		const FormElement = sut.getByTestId('form');

		fireEvent.submit(FormElement);

		expect(authenticationSpy.callsCount).toBe(0);
	});
	it(' shold present error if Authentication fails ', async () => {
		const { sut, authenticationSpy } = makeSut();
		const invalidCredencialsError = new InvalidCredencialsError();
		jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(invalidCredencialsError));
		await simulateValidSubmit({ sut });
		testElementText({ fieldName: 'main-error', sut, text: invalidCredencialsError.message });
		testErrorWrapChildCount({ count: 1, sut });
	});
	it(' shold call SaveAcessToken on sucess', async () => {
		const { sut, authenticationSpy, saveAcessTokenMock } = makeSut();
		await simulateValidSubmit({ sut });
		expect(saveAcessTokenMock.acessToken).toBe(authenticationSpy.account.accessToken);
	});
});
