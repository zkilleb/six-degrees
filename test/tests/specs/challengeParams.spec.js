import { pageObjects } from '../pageObjects';

describe('Test Challenge Query Params', () => {
  const firstActor = 'Cary Grant';
  const secondActor = 'Tom Cruise';

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  it('Missing First Actor Param Defaults to Random', () => {
    cy.visit(`?secondActor=${encodeURI(secondActor)}`);
    cy.get(pageObjects.actorName).eq(1).should('not.contain', secondActor);
  });

  it('Missing Second Actor Param Defaults to Random', () => {
    cy.visit(`?firstActor=${encodeURI(firstActor)}`);
    cy.get(pageObjects.actorName).eq(0).should('not.contain', firstActor);
  });

  it('Both Params Set Actors', () => {
    cy.visit(
      `?firstActor=${encodeURI(firstActor)}&secondActor=${encodeURI(
        secondActor,
      )}`,
    );
    cy.get(pageObjects.actorName).eq(0).should('contain', firstActor);
    cy.get(pageObjects.actorName).eq(1).should('contain', secondActor);
  });
});
