import { BiLoaderAlt } from 'react-icons/bi';

export default function Spiner() {
	return (
		<div className="flex text-primary  justify-center items-center mb-4 animate-spin" data-testid="error-wrap">
			<BiLoaderAlt size={28} />
		</div>
	);
}
