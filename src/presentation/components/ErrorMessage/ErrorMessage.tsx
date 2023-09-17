type ErrorMessageProps = {
	isError: string;
};

export function ErrorMessage({ isError }: ErrorMessageProps) {
	return (
		<div className="flex justify-center text-red-600">
			<span>{isError}</span>
		</div>
	);
}
