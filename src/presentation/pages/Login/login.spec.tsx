import { RenderResult, render, fireEvent, cleanup } from '@testing-library/react';
import { Login } from './Login';
import { Valitation } from '@/presentation/protocols/validation';

type SutTypes = {
	sut: RenderResult;
	validationSpy: ValidationSpy;
};

export class ValidationSpy implements Valitation {
	errorMessage: string = '';
	fieldName: string = '';
	fieldValue: string = '';

	validate(fieldName: string, fielValue: string): string {
		this.fieldName = fieldName;
		this.fieldValue = fielValue;
		return this.errorMessage;
	}
}

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
		const passwordInput = getByTestId('password');

		fireEvent.input(emailInput, { target: { value: 'any_email' } });

		expect(validationSpy.fieldName).toEqual('email');
		expect(validationSpy.fieldValue).toEqual('any_email');

		fireEvent.input(passwordInput, { target: { value: 'any_password' } });
		expect(validationSpy.fieldName).toEqual('password');
		expect(validationSpy.fieldValue).toEqual('any_password');
	});
});
