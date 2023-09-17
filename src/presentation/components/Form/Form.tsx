import { Input } from '../Input/Input';
import Spiner from '../Spiner/Spiner';

export function Form() {
	return (
		<form className="flex flex-col w-[500px] mx-auto bg-white p-8 rounded-xl self-center shadow-md">
			<h2 className="text-primaryDark text-center text-2xl uppercase font-bold">Login</h2>
			<Input type="email" name="email" placeholder="digite seu e-mail" />
			<Input type="password" name="password" placeholder="digite seu senha" />
			<button
				type="submit"
				className="bg-primary text-white rounded-xl text-lg border-none leading-[60px] hover:opacity-90 mb-6"
			>
				ENTRAR
			</button>
			<Spiner />
			<div className="text-center  hover:text-primary font-bold transition-all">
				<a href="">Criar Conta</a>
			</div>
		</form>
	);
}
