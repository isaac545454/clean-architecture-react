/// <reference types="cypress" />

import { faker } from '@faker-js/faker'

describe('<Login />', () => {
	beforeEach(() => {
		cy.visit('http://localhost:5173/login')
	})
	it('should load with correct initial state', () => {
		cy.get('[data-testid="email-status"]')
			.should('have.attr', 'title', 'campo obrigatorio')
			.should('contain.text', '🔴')
		cy.get('[data-testid="password-status"]')
			.should('have.attr', 'title', 'campo obrigatorio')
			.should('contain.text', '🔴')
		cy.get('[data-testid="submit"]').should('have.attr', 'disabled')
		cy.get('[data-testid="error-wrap"]').should('not.have.descendants')
	})
	it('should present error state if form is invalid ', () => {
		cy.get('[data-testid="email"]').type(faker.animal.cat())
		cy.get('[data-testid="email-status"]').should('have.attr', 'title', 'valor invalido').should('contain.text', '🔴')
		cy.get('[data-testid="password"]').type('123')
		cy.get('[data-testid="password-status"]')
			.should('have.attr', 'title', 'valor invalido')
			.should('contain.text', '🔴')
		cy.get('[data-testid="submit"]').should('have.attr', 'disabled')
		cy.get('[data-testid="error-wrap"]').should('not.have.descendants')
	})
})
