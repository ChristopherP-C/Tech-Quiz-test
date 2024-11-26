// create cypress test for quiz component

//import React from "react";
import Quiz from '../../client/src/components/Quiz';
import { mount } from 'cypress/react';
import { mockQuiz } from '../support/utils/helpers';
import '@testing-library/cypress/add-commands';

// create cypress test for quiz component
// it needs to intercept the api route to get the quiz questions and replace the random route with the mockQuiz object
describe('<Quiz />', () => {
    beforeEach(() => {
        cy.intercept('GET', '/api/questions/random', (req) => {
            req.reply({
                body: mockQuiz,
                statusCode: 200
            });
        }).as('getQuestions');
    });

        it('should load the quiz and display the first question', () => {
            mount(<Quiz />);

            cy.get('[data-cy="start"]').click();

            cy.wait('@getQuestions').its('response.statusCode').should('eq', 200);

            cy.get('[data-cy="quiz"]').should('be.visible');
            cy.get('[data-cy="question"]').should('have.text', mockQuiz.question);
            cy.get('[data-cy="answer"]').should('have.length', mockQuiz.answers.length);
        })

        it('should show the correct answer when clicked', () => {
            mount(<Quiz />);

            cy.get('[data-cy="start"]').click();

            cy.wait('@getQuestions').its('response.statusCode').should('eq', 200);

            cy.contains('true').click();

            cy.get('[data-cy="completed"]').should('be.visible');
            cy.contains('Your score: 1/1').should('be.visible');
        });
});