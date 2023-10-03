import { useState } from 'react'
import { StateFormValue } from './componentes/Form/state'
// import { useNavigate } from 'react-router-dom'
import { LoginProps } from '@/presentation/pages/Login/interface'

export const useLogin = ({ validation, authentication, saveAccessToken }: LoginProps) => {
	const [form, setForm] = useState(StateFormValue)
	// const navigate = useNavigate()

	const isDisabledButton = !!form.emailError || !!form.passwordError

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

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault()
		if (form.isLoading || form.emailError || form.passwordError) return

		try {
			setForm(prev => ({
				...prev,
				isLoading: true,
			}))
			const account = await authentication.auth({
				email: form.email,
				password: form.password,
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

	return {
		form,
		setForm,
		changeInput,
		onSubmit,
		isDisabledButton,
	}
}
