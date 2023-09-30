import { render, cleanup } from '@testing-library/react'
import { SignUp } from '.'
import { SutTypes } from './interface'
import * as Helper from '@/presentation/test/form-helper'
import { ValidationSpy } from '@/presentation/test'

const makeSut = (errorMessage?: string): SutTypes => {
	const validationSpy = new ValidationSpy()
	if (errorMessage) {
		validationSpy.errorMessage = errorMessage
	}
	const sut = render(<SignUp validation={validationSpy} />)
	return {
		sut,
		validationSpy,
	}
}

describe('<SignUp />', () => {
	afterEach(cleanup)
	test('Should start with initial state', () => {
		const required = 'campo obrigatorio'
		const { sut } = makeSut(required)
		Helper.testChildCount({ count: 0, sut, fieldName: 'error-wrap' })
		Helper.testButtonIsDisabled({ sut, fieldName: 'submit', isDisabled: true })
		Helper.testStatusForFiel({
			sut,
			fielName: 'name',
			errorMessage: required,
		})
		Helper.testStatusForFiel({
			sut,
			fielName: 'email',
			errorMessage: required,
		})
		Helper.testStatusForFiel({
			sut,
			fielName: 'password',
			errorMessage: required,
		})
		Helper.testStatusForFiel({
			sut,
			fielName: 'confirmation',
			errorMessage: required,
		})
	})
	it('Should call name validation with correct fails', () => {
		const validateError = 'campo obrigatorio'
		const { sut } = makeSut(validateError)
		Helper.populateField({ sut, fielName: 'name' })
		Helper.testStatusForFiel({ sut, fielName: 'name', errorMessage: validateError })
	})
	it('Should call email validation with correct fails', () => {
		const validateError = 'campo obrigatorio'
		const { sut } = makeSut(validateError)
		Helper.populateField({ sut, fielName: 'email' })
		Helper.testStatusForFiel({ sut, fielName: 'email', errorMessage: validateError })
	})
	it('Should call password validation with correct fails', () => {
		const validateError = 'campo obrigatorio'
		const { sut } = makeSut(validateError)
		Helper.populateField({ sut, fielName: 'password' })
		Helper.testStatusForFiel({ sut, fielName: 'password', errorMessage: validateError })
	})
	it('Should call confirmation validation with correct fails', () => {
		const validateError = 'campo obrigatorio'
		const { sut } = makeSut(validateError)
		Helper.populateField({ sut, fielName: 'confirmation' })
		Helper.testStatusForFiel({ sut, fielName: 'confirmation', errorMessage: validateError })
	})
	it('Should show valid name state if validation succeeds', () => {
		const { sut } = makeSut()
		Helper.populateField({ sut, fielName: 'name' })
		Helper.testStatusForFiel({
			sut,
			fielName: 'name',
		})
	})
	it('Should show valid email state if validation succeeds', () => {
		const { sut } = makeSut()
		Helper.populateField({ sut, fielName: 'email' })
		Helper.testStatusForFiel({
			sut,
			fielName: 'email',
		})
	})
	it('Should show valid password state if validation succeeds', () => {
		const { sut } = makeSut()
		Helper.populateField({ sut, fielName: 'password' })
		Helper.testStatusForFiel({
			sut,
			fielName: 'password',
		})
	})
	it('Should show valid confirmation state if validation succeeds', () => {
		const { sut } = makeSut()
		Helper.populateField({ sut, fielName: 'confirmation' })
		Helper.testStatusForFiel({
			sut,
			fielName: 'confirmation',
		})
	})
	it('shold enabled submit button if form is valid', () => {
		const { sut } = makeSut()
		Helper.populateField({ sut, fielName: 'name' })
		Helper.populateField({ sut, fielName: 'email' })
		Helper.populateField({ sut, fielName: 'password' })
		Helper.populateField({ sut, fielName: 'confirmation' })
		Helper.testButtonIsDisabled({ isDisabled: false, fieldName: 'submit', sut })
	})
})
