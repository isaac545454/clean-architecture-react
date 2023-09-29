import { render } from '@testing-library/react';
import { SignUp } from '.';
import { SutTypes } from './interface';
import * as Helper from '@/presentation/test/form-helper';

const makeSut = (): SutTypes => {
	const sut = render(<SignUp />);
	return {
		sut,
	};
};

describe('<SignUp />', () => {
	test('', () => {
		const { sut } = makeSut();
		const validateError = 'campo obrigatorio';
		Helper.testChildCount({ count: 0, sut, fieldName: 'error-wrap' });
		Helper.testButtonIsDisabled({ sut, fieldName: 'submit', isDisabled: true });
		Helper.testStatusForFiel({
			sut,
			fielName: 'name',
			errorMessage: validateError,
		});
		Helper.testStatusForFiel({
			sut,
			fielName: 'email',
			errorMessage: validateError,
		});
		Helper.testStatusForFiel({
			sut,
			fielName: 'password',
			errorMessage: validateError,
		});
		Helper.testStatusForFiel({
			sut,
			fielName: 'passwordConfirmation',
			errorMessage: validateError,
		});
	});
});
