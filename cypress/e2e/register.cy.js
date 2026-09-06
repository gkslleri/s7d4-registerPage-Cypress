import { errorMessages } from "../../src/components/register";

describe('Register Page', () => {
  beforeEach(() => {
    cy.visit('/');
  })
  describe('Error Messages', () => {
    it('Name input throws error for 2 chars', () => {
      // Arrange
      //cy.visit('http://localhost:5173/');
      // Act
      cy.get('[data-cy="ad-input"]').type('gö');
      // Assert
      cy.contains(errorMessages.ad).should('be.visible');
    });

    it('Surname input throws error for 2 chars', () => {
      // Arrange
      //cy.visit('http://localhost:5173/');
      // Act
      cy.get('[data-cy="soyad-input"]').type('İl');
      // Assert
      cy.contains(errorMessages.soyad).should('be.visible');
    });

    it('Email input throws error for emre@vit.', () => {
      // Arrange
      //cy.visit('http://localhost:5173/');
      // Act
      cy.get('[data-cy="email-input"]').type('emre@vit.');
      // Assert
      cy.contains(errorMessages.email).should('be.visible');
    });

    it('Password input throws error for 1234', () => {
      // Arrange
      //cy.visit('http://localhost:5173/');
      // Act
      cy.get('[data-cy="password-input"]').type('1234');
      // Assert
      cy.contains(errorMessages.password).should('be.visible');
    });

    it('Button is disabled for unvalidated inputs', () => {
      // Arrange
      //cy.visit('http://localhost:5173/');
      // Act
      cy.get('[data-cy="password-input"]').type('1234');
      // Assert
      cy.get('[data-cy="submit-button"]').should('be.disabled');
    });
  });
  describe('Form Input Validated', () => {
    it('Button enabled for validated inputs', () => {
      // Arrange
      //cy.visit('http://localhost:5173/');
      // Act
      cy.get('[data-cy="ad-input"]').type('Göksel');
      cy.get('[data-cy="soyad-input"]').type('İleri');
      cy.get('[data-cy="email-input"]').type('emre@vit.com.tr');
      cy.get('[data-cy="password-input"]').type('1234Aa*');
      // Assert
      cy.get('[data-cy="submit-button"]').should('not.be.disabled');
    });

    it('Submits form on validated input', () => {
      // Arrange
      //cy.visit('http://localhost:5173/');
      // Act
      cy.get('[data-cy="ad-input"]').type('Göksel');
      cy.get('[data-cy="soyad-input"]').type('İleri');
      cy.get('[data-cy="email-input"]').type('emre@vit.com.tr');
      cy.get('[data-cy="password-input"]').type('1234Aa*');
      cy.get('[data-cy="submit-button"]').click();
      // Assert
      cy.get('[data-cy="response-message"]').should('be.visible');
    });
  });
});