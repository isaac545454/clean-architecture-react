import { useState } from 'react'
import { StateFormValue } from './state'
import { SignUpProps } from './interface'

export const useSignUp = ({ validation, addAccount, saveAccessToken }: SignUpProps) => {
	const [form, setForm] = useState(StateFormValue)

	const isDisabledButton = !!form.emailError || !!form.passwordError || !!form.nameError || !!form.confirmationError

	const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const field = e.target.name
		const value = { [field]: e.target.value }
		setForm(pre => {
			return {
				...pre,
				[e.target.name]: e.target.value,
				[`${e.target.name}Error`]: validation.validate(field, value),
			}
		})
	}

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		if (!form.email || !form.confirmation || !form.password || !form.name || form.isLoading) return

		try {
			setForm(preview => {
				return {
					...preview,
					isLoading: true,
				}
			})
			const account = await addAccount.add({
				email: form.email,
				name: form.name,
				password: form.password,
				confirmation: form.confirmation,
			})
			await saveAccessToken.save(account.accessToken)
		} catch (err: any) {
			setForm(prev => ({
				...prev,
				isLoading: false,
				main: err.message,
			}))
		}
	}

	return { form, changeInput, isDisabledButton, onSubmit }
}
