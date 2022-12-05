import { pageObjects } from '../pageObjects';

describe('Test Not Found Page', () => {
  it('Route is Not Found', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
    window.localStorage.setItem('playedBefore', true)
    cy.visit('/not-a-real-route');
    cy.get(pageObjects.notFoundHeader).should('contain', 'Page Not Found');
    cy.get(pageObjects.notFoundLink).should('contain', 'Return Home');
  });
});
