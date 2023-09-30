import { fireEvent } from '@testing-library/react'
import {
	SimulateStatusForFielProps,
	TestButtonIsDisabledProps,
	TestChildCountProps,
	TestElementExistsProps,
	TestElementTextProps,
	simulateValidSubmitProps,
} from './interface'
import { faker } from '@faker-js/faker'

export const testChildCount = ({ sut, count, fieldName }: TestChildCountProps) => {
	const el = sut.getByTestId(fieldName)
	expect(el.childElementCount).toBe(count)
}

export const testButtonIsDisabled = ({ sut, fieldName, isDisabled }: TestButtonIsDisabledProps) => {
	const button = sut.getByTestId(fieldName) as HTMLButtonElement
	expect(button.disabled).toBe(isDisabled)
}

export const testStatusForFiel = ({ sut, fielName, errorMessage }: SimulateStatusForFielProps) => {
	const fieldStatus = sut.getByTestId(`${fielName}-status`)
	expect(fieldStatus.title).toBe(errorMessage || 'tudo certo')
	expect(fieldStatus.textContent).toBe(errorMessage ? '🔴' : '🟢')
}

export const populateField = ({ sut, fielName, value = faker.internet.email() }: simulateValidSubmitProps) => {
	const emailInput = sut.getByTestId(fielName)
	fireEvent.input(emailInput, { target: { value } })
}

export const testElementExists = ({ sut, fieldName }: TestElementExistsProps) => {
	const el = sut.getByTestId(fieldName)
	expect(el).toBeTruthy()
}

export const testElementText = ({ sut, fieldName, text }: TestElementTextProps) => {
	const el = sut.getByTestId(fieldName)
	expect(el.textContent).toBe(text)
}
