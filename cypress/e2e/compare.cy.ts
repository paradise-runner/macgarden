describe('Device Comparison', () => {
  beforeEach(() => {
    cy.visit('/compare')
  })

  it('should load the compare page', () => {
    cy.get('.bg-card').should('exist')
    cy.get('button').contains('Grow Garden').should('be.disabled')
  })

  it('should allow selecting device type and models', () => {
    // Select device type
    cy.get('[role="group"]').find('button').first().click()
    
    // Select first device
    cy.get('[role="combobox"]').first().click()
    cy.get('[role="option"]').first().click()
    
    // Select second device
    cy.get('[role="combobox"]').last().click()
    cy.get('[role="option"]').last().click()
    
    // Compare button should be enabled
    cy.get('button').contains('Grow Garden').should('not.be.disabled')
  })

  it('should navigate to comparison results', () => {
    // Select devices
    cy.get('[role="group"]').find('button').first().click()
    cy.get('[role="combobox"]').first().click()
    cy.get('[role="option"]').first().click()
    cy.get('[role="combobox"]').last().click()
    cy.get('[role="option"]').last().click()
    
    // Click compare
    cy.get('button').contains('Grow Garden').click()
    
    // Verify URL and comparison content
    cy.url().should('include', '/compare?device1=')
    cy.get('.device-comparison').should('exist')
  })

  it('should handle direct comparison URLs', () => {
    // Visit a direct comparison URL (adjust IDs as needed)
    cy.visit('/compare?device1=526&device2=513')
    cy.get('.device-comparison').should('exist')
    cy.get('[role="combobox"]').should('have.length', 2)
  })
})
