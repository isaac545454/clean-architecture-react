/// <reference types="cypress" />

describe('template spec', () => {
	beforeEach(() => {
		cy.visit('http://localhost:5173/login')
	})
	it('passes', () => {
		cy.get('[data-testid="email-status"]')
			.should('have.attr', 'title', 'campo obrigatorio')
			.should('contain.text', '🔴')
		cy.get('[data-testid="password-status"]')
			.should('have.attr', 'title', 'campo obrigatorio')
			.should('contain.text', '🔴')
		cy.get('[data-testid="submit"]').should('have.attr', 'disabled')
		cy.get('[data-testid="error-wrap"]').should('not.have.descendants')
	})
})
