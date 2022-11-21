import { pageObjects } from '../pageObjects';
import { modernActors, classicActors } from '../../../src/constants';

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

  it('Settings Modal Should Open', () => {
    cy.get(pageObjects.headerSettings).click();
    cy.get(pageObjects.settingsModalHeader).should('contain', 'Settings');
    cy.get(pageObjects.eraToggleHeader).should('contain', 'Starting Actor Era');
    cy.get(pageObjects.modernButton).should(
      'have.css',
      'background-color',
      'rgb(68, 85, 102)',
    );
    cy.get(pageObjects.bothButton).should(
      'not.have.css',
      'background-color',
      'rgb(68, 85, 102)',
    );
    cy.get(pageObjects.classicButton).should(
      'not.have.css',
      'background-color',
      'rgb(68, 85, 102)',
    );
    cy.get(pageObjects.bothButton).click();
    cy.get(pageObjects.settingsModalHeader).should('not.be', 'visible');
    cy.get(pageObjects.actorName)
      .eq(0)
      .then(($el) => {
        const text = $el.text();
        const tempArr = [...modernActors, ...classicActors].filter((actor) => {
          return actor.name === text;
        });
        expect(tempArr).to.have.length(1);
      });
    cy.get(pageObjects.actorName)
      .eq(1)
      .then(($el) => {
        const text = $el.text();
        const tempArr = [...modernActors, ...classicActors].filter((actor) => {
          return actor.name === text;
        });
        expect(tempArr).to.have.length(1);
      });
    cy.get(pageObjects.headerSettings).click();
    cy.get(pageObjects.bothButton).should(
      'have.css',
      'background-color',
      'rgb(68, 85, 102)',
    );
    cy.get(pageObjects.modernButton).should(
      'not.have.css',
      'background-color',
      'rgb(68, 85, 102)',
    );
    cy.get(pageObjects.classicButton).should(
      'not.have.css',
      'background-color',
      'rgb(68, 85, 102)',
    );
    cy.get(pageObjects.classicButton).click();
    cy.get(pageObjects.settingsModalHeader).should('not.be', 'visible');
    cy.get(pageObjects.actorName)
      .eq(0)
      .then(($el) => {
        const text = $el.text();
        const tempArr = [...modernActors, ...classicActors].filter((actor) => {
          return actor.name === text;
        });
        expect(tempArr).to.have.length(1);
      });
    cy.get(pageObjects.actorName)
      .eq(1)
      .then(($el) => {
        const text = $el.text();
        const tempArr = [...classicActors].filter((actor) => {
          return actor.name === text;
        });
        expect(tempArr).to.have.length(1);
      });
    cy.get(pageObjects.headerSettings).click();
    cy.get(pageObjects.classicButton).should(
      'have.css',
      'background-color',
      'rgb(68, 85, 102)',
    );
    cy.get(pageObjects.modernButton).should(
      'not.have.css',
      'background-color',
      'rgb(68, 85, 102)',
    );
    cy.get(pageObjects.bothButton).should(
      'not.have.css',
      'background-color',
      'rgb(68, 85, 102)',
    );
    cy.get(pageObjects.modernButton).click();
    cy.get(pageObjects.settingsModalHeader).should('not.be', 'visible');
    cy.get(pageObjects.actorName)
      .eq(0)
      .then(($el) => {
        const text = $el.text();
        const tempArr = [...modernActors, ...classicActors].filter((actor) => {
          return actor.name === text;
        });
        expect(tempArr).to.have.length(1);
      });
    cy.get(pageObjects.actorName)
      .eq(1)
      .then(($el) => {
        const text = $el.text();
        const tempArr = [...modernActors].filter((actor) => {
          return actor.name === text;
        });
        expect(tempArr).to.have.length(1);
      });
  });
});
