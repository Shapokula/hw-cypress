describe('logIn', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  it('Should log in', () => {
    cy.login("test@test.com", "test");
    cy.contains("Добро пожаловать test@test.com").should("be.visible");
  })

  it("Should not login with empty login", () => {
    cy.login(null, "test");
    cy.get('#mail').then($el => $el[0].checkValidity()).should('be.false');
    })

  it("Should not login with empty password", () => {
    cy.login("test@test.com", null);
    cy.get('#pass').then($el => $el[0].checkValidity()).should('be.false')
  })
})

describe('favourites', () => {
  before(() => {
    cy.visit('/');
    cy.login("test@test.com", "test");
    cy.populateLibrary();
    cy.contains("Add to favorite").click();
  });

  beforeEach(() => {
    cy.visit('/');
    cy.login("test@test.com", "test");
  })

  it('Should add a book to favourite when book is created', () => {
    cy.contains("Add new").click();
    cy.get("#title").type("Favourite");
    cy.get("#favorite").check();
    cy.contains("Submit").click(); // создать книгу с флагом добавить в избранное
    cy.contains("Favorites").click(); // перейти на вкладку избранное
    cy.contains("Favourite").should("be.visible"); // проверить наличие книги в избранном
  })

  context("Favorites tab", () => {
    beforeEach(() => {
      cy.contains("Favorites").click();
    })

    it('Should open a book page from favourite', () => {
      cy.get(".card").click("center"); // нажать на книгу
      cy.contains("Dowload book").should("be.visible"); // проверить кнопку "Download book"
    })

    it('Should remove a book from favourite', () => {
      cy.get(".card-title").should("be.visible");
      cy.get(".card-deck").find(".card")
        .then(($cards) => {
          const numberOfFavourites = $cards.length; // запомнить количество книг в избранном
          cy.contains("Delete from favorite").click(); // удалить из избранного первую книгу
          cy.get(".card-title").should("be.visible");
          cy.get(".card-deck").find(".card").its('length').should("be.lessThan", numberOfFavourites);
        })
    })
  })  
})