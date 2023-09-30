import { ErrorMessage } from '@/presentation/components/ErrorMessage'
import { Input } from '../../../../components/Input/Input'
import { SignUpProps } from '../../interface'
import { useSignUp } from '../../useSignUp'
import Spiner from '@/presentation/components/Spiner/Spiner'

export const Form: React.FC<SignUpProps> = ({ validation, addAccount }) => {
	const { form, changeInput, isDisabledButton, onSubmit } = useSignUp({ validation, addAccount })
	return (
		<form
			data-testid="form"
			className="flex flex-col w-[500px] mx-auto bg-white p-8 rounded-xl self-center shadow-md"
			onSubmit={onSubmit}
		>
			<h2 className="text-primaryDark text-center text-2xl uppercase font-bold">Criar Conta</h2>
			<Input
				name="name"
				placeholder="digite seu Nome"
				testid="name-status"
				data-testid="name"
				title={form.nameError}
				value={form.name}
				onChange={e => changeInput(e)}
			/>
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
			<Input
				type="password"
				name="confirmation"
				placeholder="repita sua senha"
				testid="confirmation-status"
				data-testid="confirmation"
				title={form.confirmationError}
				value={form.confirmation}
				onChange={e => changeInput(e)}
			/>
			<button
				type="submit"
				data-testid="submit"
				disabled={isDisabledButton}
				className="bg-primary text-white rounded-xl text-lg border-none leading-[60px] hover:opacity-90 mb-6 disabled:opacity-80"
			>
				ENTRAR
			</button>
			<div data-testid="error-wrap">
				{form.main && <ErrorMessage isError={form.main} />}
				{form.isLoading && <Spiner />}
			</div>
			<div className="text-center  hover:text-primary font-bold transition-all">
				<span>Criar Conta</span>
			</div>
		</form>
	)
}
