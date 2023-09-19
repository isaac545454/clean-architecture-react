import { BiLoaderAlt } from 'react-icons/bi';

export default function Spiner() {
	return (
		<div data-testid="spinner" className="flex text-primary  justify-center items-center mb-4 animate-spin">
			<BiLoaderAlt size={28} />
		</div>
	);
}
