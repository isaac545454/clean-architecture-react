/// <reference types="cypress" />

import { faker } from '@faker-js/faker'
const baseUrl: string = 'http://localhost:5173/login'

describe('<Login />', () => {
	beforeEach(() => {
		cy.visit(baseUrl)
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
	it('should present valid state if form is valid ', () => {
		cy.get('[data-testid="email"]').type(faker.internet.email())
		cy.get('[data-testid="email-status"]').should('have.attr', 'title', 'tudo certo').should('contain.text', '🟢')
		cy.get('[data-testid="password"]').type(faker.internet.password())
		cy.get('[data-testid="password-status"]').should('have.attr', 'title', 'tudo certo').should('contain.text', '🟢')
		cy.get('[data-testid="submit"]').should('not.have.attr', 'disabled')
		cy.get('[data-testid="error-wrap"]').should('not.have.descendants')
	})
	it('should present invlaidCredentialsError on 401', () => {
		cy.intercept('POST', '/login', {
			status: 401,
			body: { error: faker.animal.cat() },
		}).as('requestLoginFail')
		cy.get('[data-testid="email"]').type(faker.internet.email())
		cy.get('[data-testid="password"]').type(faker.internet.password())
		cy.get('[data-testid="submit"]').click()
		cy.get('[data-testid="error-wrap"]')
			.get('[data-testid="spinner"]')
			.should('exist')
			.get('[data-testid="main-error"]')
			.should('not.exist')
			.get('[data-testid="spinner"]')
			.should('not.exist')
			.get('[data-testid="main-error"]')
			.should('exist')
		cy.url().should('eq', baseUrl)
	})
	it('should present UnexpectedError on 400', () => {
		cy.intercept('POST', '/login', {
			status: 400,
			body: { error: faker.animal.cat() },
		}).as('requestLoginFail')
		cy.get('[data-testid="email"]').type(faker.internet.email())
		cy.get('[data-testid="password"]').type(faker.internet.password())
		cy.get('[data-testid="submit"]').click()
		cy.get('[data-testid="error-wrap"]')
			.get('[data-testid="spinner"]')
			.should('not.exist')
			.get('[data-testid="main-error"]')
			.should('exist')

		cy.url().should('eq', baseUrl)
	})
	it('should  present save acessToken if valid credentials are provided ', () => {
		cy.intercept('POST', 'login', {
			status: 200,
			body: { accessToken: faker.database.mongodbObjectId() },
		})
		cy.get('[data-testid="email"]').type('teste@teste.com')
		cy.get('[data-testid="password"]').type('12345')
		cy.get('[data-testid="submit"]').click()
		cy.get('[data-testid="error-wrap"]')
			.get('[data-testid="spinner"]')

			.should('not.exist')
			.get('[data-testid="spinner"]')
			.should('not.exist')
		cy.window().then(w => {
			assert.isOk(w.localStorage.getItem('acessToken'))
		})
	})
})
