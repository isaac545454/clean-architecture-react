import { ButtonSubmitProps } from './interface'

export function ButtonSubmit({ ...PropsButton }: ButtonSubmitProps) {
	return (
		<button
			type="submit"
			data-testid="submit"
			{...PropsButton}
			className="bg-primary text-white rounded-xl text-lg border-none leading-[60px] hover:opacity-90 mb-6 disabled:opacity-80"
		/>
	)
}
