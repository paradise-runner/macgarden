export {}

declare global {
  namespace Cypress {
    interface Chainable {
      selectDevices(type: string, device1: number, device2: number): Chainable<void>
    }
  }
}

Cypress.Commands.add('selectDevices', (type: string, device1: number, device2: number) => {
  cy.get('[role="group"]').contains(type).click()
  cy.get('[role="combobox"]').first().click()
  cy.get('[role="option"]').eq(device1).click()
  cy.get('[role="combobox"]').last().click()
  cy.get('[role="option"]').eq(device2).click()
})
