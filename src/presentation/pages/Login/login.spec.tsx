import { render } from '@testing-library/react';
import { Login } from './Login';

describe('<Login />', () => {
	it('Should start with initial state', () => {
		const { getByTestId } = render(<Login />);
		const errorWrap = getByTestId('error-wrap');
		expect(errorWrap.childElementCount).toBe(0);

		const ButtonSubmit = getByTestId('submit') as HTMLButtonElement;
		expect(ButtonSubmit.disabled).toBe(true);
	});
});
