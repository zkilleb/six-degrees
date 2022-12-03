import { pageObjects } from '../pageObjects';

describe('Test App on Mobile View', () => {
  before(() => {
    cy.visit('/');
  });

  beforeEach(() => {
    cy.viewport(400, 882);
  });

  it('Header Tabs are Visible', () => {
    cy.get(pageObjects.headerHelp).should('be.visible');
    cy.get(pageObjects.headerSettings).should('be.visible');
    cy.get(pageObjects.headerShare).should('be.visible');
    cy.get(pageObjects.headerSupport).should('be.visible');
  });

  it('Banner Should be Visible', () => {
    cy.get(pageObjects.titleBanner).should('be.visible');
  });

  it('Game Form Should be Visible', () => {
    cy.get(pageObjects.actorCard).eq(0).should('contain', 'Connect');
    cy.get(pageObjects.actorCard).eq(1).should('contain', 'To');
    cy.get(`${pageObjects.movieField} >>`)
      .should('have.attr', 'placeholder')
      .and('equal', 'Guess a movie...');
    cy.get(pageObjects.addButton).should('contain', 'Add');
    cy.get(pageObjects.guessCard).should('have.length', 6);
    cy.get(pageObjects.guessCard).eq(0).should('contain', '?');
    cy.get(pageObjects.guessCard).eq(1).should('contain', '?');
    cy.get(pageObjects.guessCard).eq(2).should('contain', '?');
    cy.get(pageObjects.guessCard).eq(3).should('contain', '?');
    cy.get(pageObjects.guessCard).eq(4).should('contain', '?');
    cy.get(pageObjects.guessCard).eq(5).should('contain', '?');
  });

  it('Submit Button Should Be Visible', () => {
    cy.get(pageObjects.submitButton).should('contain', 'Submit');
    cy.get(pageObjects.submitButton).should('have.attr', 'disabled');
  });

  it('Footer Should Be Visible', () => {
    cy.get(pageObjects.footer).should(
      'contain',
      'This product uses the TMDB API but is not endorsed or certified by TMDB.',
    );
  });
});
