import { Input } from '../../../../components/Input/Input'
import Spiner from '../../../../components/Spiner/Spiner'
import { ErrorMessage } from '../../../../components/ErrorMessage/ErrorMessage'
import { LoginProps } from '@/presentation/pages/Login/interface'
import { useLogin } from '../../useLogin'
import { ButtonSubmit } from '@/presentation/components/ButtonSubmit'

export const Form: React.FC<LoginProps> = ({ validation, authentication, saveAccessToken }) => {
	const { changeInput, form, onSubmit, isDisabledButton } = useLogin({ validation, authentication, saveAccessToken })
	return (
		<form
			className="flex flex-col w-[500px] mx-auto bg-white p-8 rounded-xl self-center shadow-md"
			data-testid="form"
			onSubmit={onSubmit}
		>
			<h2 className="text-primaryDark text-center text-2xl uppercase font-bold">Login</h2>
			<Input
				type="email"
				name="email"
				placeholder="digite seu e-mail"
				testid="email-status"
				data-testid="email"
				title={form.emailError}
				value={form.email}
				onChange={e => changeInput(e)}
			/>
			<Input
				type="password"
				name="password"
				placeholder="digite seu senha"
				testid="password-status"
				data-testid="password"
				title={form.passwordError}
				value={form.password}
				onChange={e => changeInput(e)}
			/>
			<ButtonSubmit disabled={isDisabledButton}>ENTRAR</ButtonSubmit>
			<div data-testid="error-wrap">
				{form.main && <ErrorMessage isError={form.main} />}
				{form.isLoading && <Spiner />}
			</div>
			<div className="text-center  hover:text-primary font-bold transition-all">
				<a href="">Criar Conta</a>
			</div>
		</form>
	)
}
