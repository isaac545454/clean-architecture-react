import { render, cleanup } from '@testing-library/react'
import { SignUp } from '.'
import { SutTypes } from './interface'
import * as Helper from '@/presentation/test/form-helper'
import { ValidationSpy } from '@/presentation/test'

const makeSut = (): SutTypes => {
	const validationSpy = new ValidationSpy()
	validationSpy.errorMessage = 'campo obrigatorio'
	const sut = render(<SignUp validation={validationSpy} />)
	return {
		sut,
		validationSpy,
	}
}

describe('<SignUp />', () => {
	afterEach(cleanup)
	test('Should start with initial state', () => {
		const { sut } = makeSut()

		const required = 'campo obrigatorio'
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
			fielName: 'passwordConfirmation',
			errorMessage: required,
		})
	})
	it('Should call name validation with correct fails', () => {
		const validateError = 'campo obrigatorio'
		const { sut } = makeSut()
		Helper.populateField({ sut, fielName: 'name' })
		Helper.testStatusForFiel({ sut, fielName: 'name', errorMessage: validateError })
	})
	it('Should call email validation with correct fails', () => {
		const validateError = 'campo obrigatorio'
		const { sut } = makeSut()
		Helper.populateField({ sut, fielName: 'email' })
		Helper.testStatusForFiel({ sut, fielName: 'email', errorMessage: validateError })
	})
	it('Should call password validation with correct fails', () => {
		const validateError = 'campo obrigatorio'
		const { sut } = makeSut()
		Helper.populateField({ sut, fielName: 'password' })
		Helper.testStatusForFiel({ sut, fielName: 'password', errorMessage: validateError })
	})
	it('Should call passwordConfirmation validation with correct fails', () => {
		const validateError = 'campo obrigatorio'
		const { sut } = makeSut()
		Helper.populateField({ sut, fielName: 'passwordConfirmation' })
		Helper.testStatusForFiel({ sut, fielName: 'passwordConfirmation', errorMessage: validateError })
	})
})
