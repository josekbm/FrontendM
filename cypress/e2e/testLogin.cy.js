describe('Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('When visiting another route without being logged it should navigate to login', () => {
    cy.visit("http://localhost:3000/Rooms")
    cy.get('[data-testid="login__form"]')
    cy.location('pathname').should('include', '/')

    cy.visit("http://localhost:3000/Bookings")
    cy.get('[data-testid="login__form"]')
    cy.location('pathname').should('include', '/')

    cy.visit("http://localhost:3000/Users")
    cy.get('[data-testid="login__form"]')
    cy.location('pathname').should('include', '/')

    cy.visit("http://localhost:3000/Contact")
    cy.get('[data-testid="login__form"]')
    cy.location('pathname').should('include', '/')
  })

  it('If login is correct should navigate to dashboard', () => {
    cy.get('[data-testid="login__form"]')
    cy.get('[data-testid="login__email__input"]').type("admin@admin.com")
    cy.get('[data-testid="login__password__input"]').type("admin")
    cy.get('[data-testid="login__submit__button"]').click()
    cy.location('pathname').should('not.include', '/Login')
    cy.get('[data-testid="dashboard__kpi"]')
  })

  it('If login is incorrect should stay at login', () => {
    cy.get('[data-testid="login__email__input"]').type("failUser@fail.com")
    cy.get('[data-testid="login__password__input"]').type("fail")
    cy.get('[data-testid="login__submit__button"]').click()
    cy.location('pathname').should('include', '/Login')
    cy.get('[data-testid="login__form"]')
  })
  
})

describe("Logout", ()=> {
  beforeEach(() =>{
    cy.visit("http://localhost:3000/")
    cy.get('[data-testid="login__form"]')
    cy.get('[data-testid="login__email__input"]').type("admin@admin.com")
    cy.get('[data-testid="login__password__input"]').type("admin")
    cy.get('[data-testid="login__submit__button"]').click()
    cy.location('pathname').should('include', '/')
  })

  it('If pressing on logout button should navigate to login', () => {
    
    cy.get('[data-testid="logout__button"]').click()
    cy.location('pathname').should('include', '/Login')
    cy.get('[data-testid="login__email__input"]')

  
  })

})