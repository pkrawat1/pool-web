describe("home Page", () => {
  it("should show home page", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");

    cy.get("legend").contains("All Pools");
    cy.get("legend").contains("Pool Watch list");

    cy.get("span.no-data-msg").contains("Saved pools here");
  });
});
