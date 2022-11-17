import { pageObjects } from '../pageObjects';

describe('Test User Workflow', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  before(() => {
    cy.visit('/');
  });

  it('Title Banner Should Be Visible', () => {
    cy.get(pageObjects.titleBanner).should('be.visible');
  });

  it('Share Modal Should Open', () => {
    cy.get(pageObjects.headerShare).click();
    cy.get(pageObjects.shareModalHeader).should('contain', 'Share');
    cy.get(pageObjects.twitterShareButton)
      .should('have.attr', 'aria-label')
      .and('equal', 'twitter');
    cy.get(pageObjects.facebookShareButton)
      .should('have.attr', 'aria-label')
      .and('equal', 'facebook');
    cy.get(pageObjects.redditShareButton)
      .should('have.attr', 'aria-label')
      .and('equal', 'reddit');
    cy.get(pageObjects.shareModalClose).click();
    cy.get(pageObjects.shareModalHeader).should('not.be', 'visible');
  });
});
