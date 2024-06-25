// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("clearSessionStorage", () => {
    cy.window().then((win) => {
        win.sessionStorage.clear();
    })
})

const email = "14th2junetesting@yopmail.com", password = "Hexadecimal123#"

Cypress.Commands.add("login", () => {
    cy.get("#email").type(email);
    cy.get("#password").type(password);
    cy.get('button[type="submit"]').click();
})

// Cypress.Commands.add("login", () => {
//     cy.get("#email").type("zapierintegration@yopmail.com")
//     cy.wait(1000)
//     cy.get("#password").type("Hexadecimal123#")
//     cy.wait(1000)
//     cy.get("button[type='submit']").click()
//     cy.wait(2000)
// })

import 'cypress-xpath';

Cypress.Commands.add("logout", () => {
    cy.get(".index_profileImage__WPivT").click()
    cy.get("h1[class='index_simpleParagraph__Z-+Kl index_redColor__1wN5Z']").click()
    cy.url().should("eq", "https://timegram-8ecdc.web.app/login")
})

Cypress.Commands.add('handleUncaughtException', () => {
    cy.on('uncaught:exception', (err, runnable) => {
        // Handle the uncaught exception here
        // For example, you can log the error
        console.error('Uncaught exception occurred:', err.message);
        // Return false to prevent the error from failing the test
        return false;
    })
    Cypress.Commands.add("checkNotificationMessage", (expectedMessage) => {
        cy.get(".ant-message-custom-content > :nth-child(2)")
            .should("be.visible")
            .contains(expectedMessage);
        //cy.checkSuccessMessage("Success: Your action was successful") //to use this simple add this in the file where you want to use this function
    })
    Cypress.Commands.add("closingDrawer", () => {
        cy.get(".index_closeIconWrapper__OesUG").should("be.visible").click()
    })
})

Cypress.Commands.add('clearIndexedDB', () => {
    cy.window().then((win) => {
        win.indexedDB.databases().then((databases) => {
            databases.forEach((db) => {
                win.indexedDB.deleteDatabase(db.name);
            })
        })
    })
})