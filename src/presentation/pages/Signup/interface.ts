import { Valitation } from '@/presentation/protocols/validation';
import { ValidationSpy } from '@/presentation/test';
import { RenderResult } from '@testing-library/react';

export type SignUpProps = {
	validation: Valitation;
};

export type SutTypes = {
	sut: RenderResult;
	validationSpy: ValidationSpy;
};
