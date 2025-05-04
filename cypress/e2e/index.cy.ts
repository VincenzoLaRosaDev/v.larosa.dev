describe('Accessibility testing with AXE tool', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Test for any accessibility issues on page load', () => {
    cy.injectAxe();
    cy.checkA11y();
  });

  it('Audits LightHouse test', () => {
    cy.lighthouse({
      performance: 90,
      accessibility: 100,
      'best-practices': 100,
      seo: 100,
    });
  });
});
