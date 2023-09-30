import { RenderResult } from '@testing-library/react'

export type TestChildCountProps = {
	sut: RenderResult
	count: number
	fieldName: string
}

export type TestButtonIsDisabledProps = TestElementExistsProps & {
	isDisabled: boolean
}

export type SimulateStatusForFielProps = {
	sut: RenderResult
	fielName: string
	errorMessage?: string
	count?: number
}

export type simulateValidSubmitProps = {
	sut: RenderResult
	value?: string
	fielName: string
}

export type TestElementExistsProps = {
	sut: RenderResult
	fieldName: string
}
