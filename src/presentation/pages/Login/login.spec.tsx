import { RenderResult, render } from '@testing-library/react';
import { Login } from './Login';

type SutTypes = {
	sut: RenderResult;
};

const makeSut = (): SutTypes => {
	const sut = render(<Login />);

	return {
		sut,
	};
};

describe('<Login />', () => {
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
});
