import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import { StateFormValue } from './state'
import { SignUpProps } from './interface'

export const useSignUp = ({ validation, addAccount, saveAccessToken }: SignUpProps) => {
	const [form, setForm] = useState(StateFormValue)
	// const navigate = useNavigate()

	const isDisabledButton =
		!!form.emailError || !!form.passwordError || !!form.nameError || !!form.passwordConfirmationError

	const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const field = e.target.name
		const value = e.target.value
		const values = {
			name: field === 'name' ? value : form.name,
			email: field === 'email' ? value : form.email,
			password: field === 'password' ? value : form.password,
			confirmation: field === 'confirmation' ? value : form.passwordConfirmation,
		}
		setForm(pre => {
			return {
				...pre,
				[e.target.name]: e.target.value,
				[`${e.target.name}Error`]: validation.validate(field, values),
			}
		})
	}

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		if (!form.email || !form.passwordConfirmation || !form.password || !form.name || form.isLoading) return

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
				passwordConfirmation: form.passwordConfirmation,
			})
			await saveAccessToken.save(account.accessToken)
			// navigate('/')
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
