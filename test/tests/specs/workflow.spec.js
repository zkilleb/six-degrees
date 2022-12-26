import { pageObjects } from '../pageObjects';
import { modernActors, classicActors } from '../../../src/constants';

describe('Test User Workflow', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  before(() => {
    cy.visit('/');
  });

  describe('Test playedBefore Cookie', () => {
    it('Help Modal Should Open When Cookie Is Not Set', () => {
      cy.get(pageObjects.howToPlayHeader).should('contain', 'How to Play');
      cy.get(pageObjects.howToPlayClose).click();
    });
  });

  describe('Test stats Cookie', () => {
    before(() => {
      window.localStorage.setItem(
        'stats',
        '{"gamesPlayed":3,"wins":3,"longestStreak":7,"fastestTime":32310}',
      );
    });

    it('Stat Modal Should Display Stats From Cookie', () => {
      cy.get(pageObjects.headerStats).click();
      cy.get(pageObjects.statModalBody).should('contain', 'Games Played: 3');
      cy.get(pageObjects.statModalBody).should('contain', 'Wins: 3');
      cy.get(pageObjects.statModalBody).should('contain', 'Winning %: 100%');
      cy.get(pageObjects.statModalBody).should('contain', 'Longest Streak: 7');
      cy.get(pageObjects.statModalBody).should(
        'contain',
        'Fastest Win: 0 min(s) 32 sec(s)',
      );
      cy.get(pageObjects.statClose).click();
    });

    it('Stat Modal Should Display 2 Decimal Places', () => {
      window.localStorage.removeItem('stats');
      window.localStorage.setItem(
        'stats',
        '{"gamesPlayed":7,"wins":3,"longestStreak":7,"fastestTime":32310}',
      );
      cy.get(pageObjects.headerStats).click();
      cy.get(pageObjects.statModalBody).should('contain', 'Winning %: 42.86%');
      cy.get(pageObjects.statClose).click();
    });
  });

  describe('Test Header Components', () => {
    before(() => {
      window.localStorage.setItem('playedBefore', true);
    });

    it('Help Modal Should Not Open When Cookie Is Set', () => {
      cy.get(pageObjects.howToPlayHeader).should('not.exist');
    });

    it('Title Banner Should Be Visible', () => {
      cy.get(pageObjects.titleBanner).should('be.visible');
    });

    it('Stat Modal Should Open', () => {
      cy.get(pageObjects.headerStats).click();
      cy.get(pageObjects.statModalHeader).should('contain', 'Statistics');
      cy.get(pageObjects.statModalBody).should(
        'contain',
        'No Stats At This Time',
      );
      cy.get(pageObjects.statClose).click();
      cy.get(pageObjects.statModalHeader).should('not.be', 'visible');
    });

    it('Support Modal Should Open', () => {
      cy.get(pageObjects.headerSupport).click();
      cy.get(pageObjects.supportModalHeader).should('contain', 'Support');
      cy.get(pageObjects.supportButton).should('contain', 'Support');
      cy.get(pageObjects.supportClose).click();
      cy.get(pageObjects.supportModalHeader).should('not.be', 'visible');
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

    describe('Test Settings', () => {
      it('Settings Modal Should Open', () => {
        cy.get(pageObjects.headerSettings).click();
        cy.get(pageObjects.settingsModalHeader).should('contain', 'Settings');
        cy.get(pageObjects.eraToggleHeader).should(
          'contain',
          'Starting Actor Era',
        );
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
        cy.get(pageObjects.baconButtonWrapper).should(
          'contain',
          '🥓 Bacon Mode',
        );
      });

      it('Actor Era Toggle Should Change Era', () => {
        cy.get(pageObjects.bothButton).click();
        window.localStorage.setItem('playedBefore', true);
        cy.get(pageObjects.settingsModalHeader).should('not.be', 'visible');
        cy.get(pageObjects.actorName)
          .eq(0)
          .then(($el) => {
            const text = $el.text();
            const tempArr = [...modernActors, ...classicActors].filter(
              (actor) => {
                return actor.name === text;
              },
            );
            expect(tempArr).to.have.length(1);
          });
        cy.get(pageObjects.actorName)
          .eq(1)
          .then(($el) => {
            const text = $el.text();
            const tempArr = [...modernActors, ...classicActors].filter(
              (actor) => {
                return actor.name === text;
              },
            );
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
        window.localStorage.setItem('playedBefore', true);
        cy.get(pageObjects.settingsModalHeader).should('not.be', 'visible');
        cy.get(pageObjects.actorName)
          .eq(0)
          .then(($el) => {
            const text = $el.text();
            const tempArr = [...modernActors, ...classicActors].filter(
              (actor) => {
                return actor.name === text;
              },
            );
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
        window.localStorage.setItem('playedBefore', true);
        cy.get(pageObjects.settingsModalHeader).should('not.be', 'visible');
        cy.get(pageObjects.actorName)
          .eq(0)
          .then(($el) => {
            const text = $el.text();
            const tempArr = [...modernActors, ...classicActors].filter(
              (actor) => {
                return actor.name === text;
              },
            );
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

      it('Bacon Mode Toggle Should Set Bacon Mode', () => {
        cy.get(pageObjects.headerSettings).click();
        cy.get(pageObjects.baconButton).click();
        window.localStorage.setItem('playedBefore', true);
        cy.get(pageObjects.actorName)
          .eq(0)
          .should('not.contain', 'Kevin Bacon');
        cy.get(pageObjects.actorName).eq(1).should('contain', 'Kevin Bacon');
        cy.get(pageObjects.headerSettings).click();
        cy.get(pageObjects.baconButton).click();
        window.localStorage.setItem('playedBefore', true);
      });
    });

    it('Help Modal Should Open', () => {
      cy.get(pageObjects.headerHelp).click();
      cy.get(pageObjects.howToPlayHeader).should('contain', 'How to Play');
      cy.get(pageObjects.howToPlayContent).should(
        'contain',
        'This game is a version of Six Degrees of Kevin Bacon. You are given an actor to start with and an actor to end with.',
      );
      cy.get(pageObjects.howToPlayContent).should('contain', 'Example 1:');
      cy.get(pageObjects.howToPlayContent).should('contain', 'Example 2:');
      cy.get(pageObjects.howToPlayClose).click();
      cy.get(pageObjects.howToPlayHeader).should('not.be', 'visible');
    });
  });

  describe('Test Game Form Component', () => {
    it('Actor Cards Should Be Visible', () => {
      cy.get(pageObjects.actorCard).eq(0).should('contain', 'Connect');
      cy.get(pageObjects.actorCard).eq(1).should('contain', 'To');
    });

    it('Movie Field Should Be Enabled', () => {
      cy.get(`${pageObjects.movieField} >>`)
        .should('have.attr', 'placeholder')
        .and('equal', 'Guess a movie...');
      cy.get(pageObjects.addButton).should('contain', 'Add');
    });

    it('Guess Card Should Be Visible', () => {
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
      cy.get(pageObjects.playAgainButton).should('not.exist');
    });
  });

  describe('Test Footer Component', () => {
    it('Footer Should Be Visible', () => {
      cy.get(pageObjects.footer).should(
        'contain',
        'This product uses the TMDB API but is not endorsed or certified by TMDB.',
      );
    });
  });
});
