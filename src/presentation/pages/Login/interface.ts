import { Authentication } from '@/Domain/usecases';
import { SaveAcessToken } from '@/Domain/usecases/save-acess-token';
import { Valitation } from '@/presentation/protocols/validation';
import { AuthenticationSpy, SaveAcessTokenMock, ValidationSpy } from '@/presentation/test';
import { RenderResult } from '@testing-library/react';

export type LoginProps = {
	validation: Valitation;
	authentication: Authentication;
	saveAccessToken: SaveAcessToken;
};

export type testErrorWrapChildCountProps = {
	sut: RenderResult;
	count: number;
};

export type SutTypes = {
	sut: RenderResult;
	validationSpy: ValidationSpy;
	authenticationSpy: AuthenticationSpy;
	saveAcessTokenMock: SaveAcessTokenMock;
};

export type TestElementExistsProps = {
	sut: RenderResult;
	fieldName: string;
};

export type TestElementTextProps = TestElementExistsProps & {
	text: string;
};
