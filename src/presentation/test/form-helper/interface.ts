import { TestElementExistsProps } from '@/presentation/pages/Login/interface';
import { RenderResult } from '@testing-library/react';

export type TestChildCountProps = {
	sut: RenderResult;
	count: number;
	fieldName: string;
};

export type TestButtonIsDisabledProps = TestElementExistsProps & {
	isDisabled: boolean;
};

export type SimulateStatusForFielProps = {
	sut: RenderResult;
	fielName: string;
	errorMessage?: string;
	count?: number;
};
