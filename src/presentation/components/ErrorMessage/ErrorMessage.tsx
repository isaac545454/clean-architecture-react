type ErrorMessageProps = {
	isError: string
}

export function ErrorMessage({ isError }: ErrorMessageProps) {
	return (
		<span className="flex justify-center text-red-600" data-testid="main-error" title={isError}>
			{isError}
		</span>
	)
}
