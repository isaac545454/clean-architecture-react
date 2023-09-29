import { SimulateStatusForFielProps, TestButtonIsDisabledProps, TestChildCountProps } from './interface';

export const testChildCount = ({ sut, count, fieldName }: TestChildCountProps) => {
	const el = sut.getByTestId(fieldName);
	expect(el.childElementCount).toBe(count);
};

export const testButtonIsDisabled = ({ sut, fieldName, isDisabled }: TestButtonIsDisabledProps) => {
	const button = sut.getByTestId(fieldName) as HTMLButtonElement;
	expect(button.disabled).toBe(isDisabled);
};

export const testStatusForFiel = ({ sut, fielName, errorMessage }: SimulateStatusForFielProps) => {
	const fieldStatus = sut.getByTestId(`${fielName}-status`);
	expect(fieldStatus.title).toBe(errorMessage || 'tudo certo');
	expect(fieldStatus.textContent).toBe(errorMessage ? '🔴' : '🟢');
};
