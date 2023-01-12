import { pageObjects } from '../pageObjects';

describe('Test Not Found Page', () => {
  it('Route is Not Found', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
    window.localStorage.setItem('playedBefore', true);
    cy.visit('/not-a-real-route');
    cy.get(pageObjects.notFoundHeader).should('contain', 'Page Not Found');
    cy.get(pageObjects.notFoundSubHeader).should(
      'contain',
      "Oops! It looks like you've taken a wrong turn. Feel free to click the link below the return to the game!",
    );
    cy.get(pageObjects.notFoundLink).should('contain', 'Return Home');
    cy.get(pageObjects.notFoundLink)
      .should('have.attr', 'href')
      .and('contain', '/');
  });
});
