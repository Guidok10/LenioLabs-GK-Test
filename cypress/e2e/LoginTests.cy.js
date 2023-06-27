describe('Login Tests', () => {
  
  beforeEach(() => {
    cy.visit('https://the-internet.herokuapp.com/login')
  })
  
  it('Sign in with empty user and password should give me an error message', () => {
    cy.get('#username').should('be.empty')
    cy.get('#password').should('be.empty')
    cy.get('button[type="submit"]').should('be.visible')
    cy.get('button[type="submit"]').click()
    cy.get('#flash').should('contain','Your username is invalid')
    cy.get('#flash').invoke('css', 'background-color').should('equal', 'rgb(198, 15, 19)')
  })

  it('Sign in with not registered user and password should give me an error message', () => {
    cy.get('#username').type('wrongid')
    cy.get('#password').type('wrongpassword')
    cy.get('button[type="submit"]').should('be.visible')
    cy.get('button[type="submit"]').click()
    cy.get('#flash').should('contain','Your username is invalid')
    cy.get('#flash').invoke('css', 'background-color').should('equal', 'rgb(198, 15, 19)')
  })

  it('Sign in with a registered user and password should redirect me to a secure area', () => {
    cy.get('#username').type('tomsmith')
    cy.get('#password').type('SuperSecretPassword!')
    cy.get('button[type="submit"]').should('be.visible')
    cy.get('button[type="submit"]').click()
    cy.url().should('eq','https://the-internet.herokuapp.com/secure')

    //Some extra checks in secure page. Note: I assume that there is a specific test file to test the '/secure' page
    cy.get('#flash').should('contain','You logged into a secure area!')
    cy.get('#flash').invoke('css', 'background-color').should('equal', 'rgb(93, 164, 35)')
    cy.contains('Secure Area')
    cy.contains('Welcome to the Secure Area. When you are done click logout below.')
    cy.get('.button').click()
    cy.url().should('eq','https://the-internet.herokuapp.com/login')
  })

  it('Sign in with registered user but invalid password should give me an error message', () => {
    cy.get('#username').type('tomsmith')
    cy.get('#password').type('wrongpassword')
    cy.get('button[type="submit"]').should('be.visible')
    cy.get('button[type="submit"]').click()
    cy.get('#flash').should('contain','Your password is invalid!') // Please note that giving the information that the username is valid might be a security breach
    cy.get('#flash').invoke('css', 'background-color').should('equal', 'rgb(198, 15, 19)')
  })
})