/// <reference types="cypress" />

describe("Todos Manipulate", () => {
  /* it("passes if I can add one todo", () => {
    cy.visit("http://localhost:5173/");
    cy.get("#title").type("My first todo");
    cy.get("#description").type("This is the description of my first todo");
    cy.get("#deadline").type("2024-12-31");
    cy.get("#btn-add-todo").click();
    cy.contains("My first todo").should("exist");
  }); */

  /* it("passes if adds two todos", () => {
    cy.visit("http://localhost:5173/");

    // Add the first todo
    cy.get("#title").type("My first todo");
    cy.get("#description").type("This is the description of my first todo");
    cy.get("#deadline").type("2024-12-31");
    cy.get("#btn-add-todo").click();
    cy.contains("My first todo").should("exist");

    // Add the second todo
    cy.get("#title").clear().type("My second todo");
    cy.get("#description")
      .clear()
      .type("This is the description of my second todo");
    cy.get("#deadline").clear().type("2025-01-01");
    cy.get("#btn-add-todo").click();
    cy.contains("My second todo").should("exist");

    // Verify both todos exist
    cy.contains("My first todo").should("exist");
    cy.contains("My second todo").should("exist");
  });
 */

  it("passes if removes the first todo", () => {
    cy.visit("http://localhost:5173/");
    cy.get("#title").type("My first todo");
    cy.get("#description").type("This is the description of my first todo");
    cy.get("#deadline").type("2024-12-31");
    cy.get("#btn-add-todo").click();
    cy.contains("My first todo").should("exist");
    cy.contains("My first todo")
      .parent() // Navigate to the parent element containing the todo
      .find("#btn-remove-todo") // Find the remove button within the parent
      .click();
    cy.contains("My first todo").should("not.exist"); // Verify the todo is removed
  });
});
