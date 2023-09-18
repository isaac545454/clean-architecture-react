import { forwardRef } from 'react';
import { InputProps } from './types';
import { styles } from './styles';

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	const { title, testid, ...res } = props;

	return (
		<div className="relative">
			<input ref={ref} {...res} className={styles.Input} />

			<span
				title={title ? title : 'tudo certo'}
				data-testid={testid}
				className="absolute right-2 top-2 text-2xl opacity-90 cursor-help"
			>
				{title ? '🔴' : '🟢'}
			</span>
		</div>
	);
});
