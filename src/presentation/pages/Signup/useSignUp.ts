import { useState } from 'react'
import { StateFormValue } from './state'
import { SignUpProps } from './interface'

export const useSignUp = ({ validation, addAccount }: SignUpProps) => {
	const [form, setForm] = useState(StateFormValue)

	const isDisabledButton = !!form.emailError || !!form.passwordError || !!form.nameError || !!form.confirmationError

	const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm(pre => {
			return {
				...pre,
				[e.target.name]: e.target.value,
				[`${e.target.name}Error`]: validation.validate(e.target.name, e.target.value),
			}
		})
	}

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (!form.email || !form.confirmation || !form.password || !form.name || form.isLoading) return

		try {
			setForm(preview => {
				return {
					...preview,
					isLoading: true,
				}
			})
			addAccount.add({
				email: form.email,
				name: form.name,
				password: form.password,
				confirmation: form.confirmation,
			})
		} catch (error: any) {
			setForm(preview => {
				return {
					...preview,
					main: error?.message,
					isLoading: false,
				}
			})
		}
	}

	return { form, changeInput, isDisabledButton, onSubmit }
}
