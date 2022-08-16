context('Home Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should render the home page and display a message', () => {
    cy.screenshot('home-screenshot');
    cy.get('h1').contains('Welcome').screenshot('home-welcome-screenshot');
  });
});
