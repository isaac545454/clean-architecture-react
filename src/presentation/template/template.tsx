import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { TemplateProps } from './types'

export const Template = ({ children }: TemplateProps) => {
	return (
		<div className="relative h-[100vh]">
			<Header />
			{children}
			{/* <Footer /> */}
		</div>
	)
}
