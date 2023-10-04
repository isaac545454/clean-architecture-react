import cypress from 'cypress'

declare namespace cypress {
	namespace Cypress {
		interface Chainable {
			getByTestId: (id: string) => Element
		}
	}
}
