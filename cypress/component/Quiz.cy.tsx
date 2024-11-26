// create cypress test for quiz component

//import React from "react";
import Quiz from '../../client/src/components/Quiz';
import '@testing-library/cypress/add-commands';

// create cypress test for quiz component
// it needs to intercept the api route to get the quiz questions and replace the random route with the mockQuiz object
describe('<Quiz />', () => {
    beforeEach(() => {
        cy.intercept({
            method: 'GET', url: '/api/questions/random'
        }, { 
            fixture: 'mockQuestion.json', statusCode: 200 
        }).as('getQuestions');
    });

        it('should load the quiz and display the first question', () => {
            cy.mount(<Quiz />);
            cy.get('button').contains('Start Quiz').click();
            cy.get('.card').should('be.visible');
          });

        it('should show the correct answer when clicked', () => {
            cy.mount(<Quiz />);
            cy.get('button').contains('Start Quiz').click();
            cy.get('button').contains('2').click();
            cy.get('.alert-success').should('be.visible').and('contain', 'Your score');
        });
});