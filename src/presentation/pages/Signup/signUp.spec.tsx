import { render } from '@testing-library/react';
import { SignUp } from '.';
import { SutTypes, TestChildCountProps } from './interface';
import { SimulateStatusForFielProps, TestButtonIsDisabledProps } from '../Login/interface';

const makeSut = (): SutTypes => {
	const sut = render(<SignUp />);
	return {
		sut,
	};
};

const testChildCount = ({ sut, count, fieldName }: TestChildCountProps) => {
	const el = sut.getByTestId(fieldName);
	expect(el.childElementCount).toBe(count);
};

const testButtonIsDisabled = ({ sut, fieldName, isDisabled }: TestButtonIsDisabledProps) => {
	const button = sut.getByTestId(fieldName) as HTMLButtonElement;
	expect(button.disabled).toBe(isDisabled);
};

const testStatusForFiel = ({ sut, fielName, errorMessage }: SimulateStatusForFielProps) => {
	const fieldStatus = sut.getByTestId(`${fielName}-status`);
	expect(fieldStatus.title).toBe(errorMessage || 'tudo certo');
	expect(fieldStatus.textContent).toBe(errorMessage ? '🔴' : '🟢');
};

describe('<SignUp />', () => {
	test('', () => {
		const { sut } = makeSut();
		const validateError = 'campo obrigatorio';
		testChildCount({ count: 0, sut, fieldName: 'error-wrap' });
		testButtonIsDisabled({ sut, fieldName: 'submit', isDisabled: true });
		testStatusForFiel({
			sut,
			fielName: 'name',
			errorMessage: validateError,
		});
		testStatusForFiel({
			sut,
			fielName: 'email',
			errorMessage: validateError,
		});
		testStatusForFiel({
			sut,
			fielName: 'password',
			errorMessage: validateError,
		});
		testStatusForFiel({
			sut,
			fielName: 'passwordConfirmation',
			errorMessage: validateError,
		});
	});
});
