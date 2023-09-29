import { RenderResult } from '@testing-library/react';

export type SutTypes = {
	sut: RenderResult;
};

export type TestChildCountProps = {
	sut: RenderResult;
	count: number;
	fieldName: string;
};
