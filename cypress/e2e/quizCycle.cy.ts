//import Quiz from '../../client/src/components/Quiz';
//import '@testing-library/cypress/add-commands';

// create cypress test for quiz component
// it needs to intercept the api route to get the quiz questions and replace the random route with the mockQuiz object
describe('<Quiz />', () => {
    context('Starting the quiz', () => {
        beforeEach(() => {
            cy.intercept({
                method: 'GET', url: '/api/questions/random'
            }, { 
                fixture: 'mockQuestions.json', statusCode: 200 
            }).as('getQuestions');

            cy.visit('/');
        });

        it('should display Start Quiz button', () => {
            cy.get('button').contains('Start Quiz').should('be.visible');
        })
    });

    context('Answering questions', () => {
        beforeEach(() => {
            cy.intercept({
                method: 'GET', url: '/api/questions/random'
            }, { 
                fixture: 'mockQuestions.json', statusCode: 200
            }).as('getQuestions');

            cy.visit('/');

        });


        it('should start the quiz after pressing the start button and load the first question', () => {
            cy.get('button').contains('Start Quiz').click();
            cy.get('.card').should('be.visible');
            cy.get('button').contains('2').click();
            cy.get('.card').should('be.visible');
            cy.get('button').contains('2').click();
            cy.get('.card').should('be.visible');
            cy.get('button').contains('2').click();
            cy.get('.alert-success').should('be.visible').and('contain', 'Your score');
        })
    });
    
    context('Play again button should be visible and clickable', () => {
        beforeEach(() => {
            cy.intercept({
                method: 'GET', url: '/api/questions/random'
            }, { 
                fixture: 'mockQuestion.json', statusCode: 200
            }).as('getQuestions');

            cy.visit('/');

        });


        it('should start quiz again when clicked', () => {
            cy.get('button').contains('Start Quiz').click();
            cy.get('button').contains('2').click();
            cy.get('.alert-success').should('be.visible').and('contain', 'Your score');
            cy.get('button').should('be.visible').and('contain', 'Take New Quiz');
            cy.get('button').contains('Take New Quiz').click();
            cy.get('.card').should('be.visible');
        });
    })
})