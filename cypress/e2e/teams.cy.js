import "./../support/commands";
describe("Teams Page All Test Cases", () => {

    beforeEach(() => {
        cy.handleUncaughtException(); //handling uncaught exception
        cy.viewport(1300, 660); //increasing the size of the page to get full view of the application
        cy.clearAllSessionStorage(); //clearing the session storage
        cy.clearAllLocalStorage();
        cy.clearIndexedDB();
    })

    const email = "regression6@yopmail.com", capacity = "20", costRate = "30"

    const existingUser = "regression03@yopmail.com", newEmail = "newemail@yopmail.com"


    const name = "Musayyib", updatedFullName = "Updated Name", updatedFirstName = "Updated", updatedLastName = "Name", fullName = "Musayyib Ahmed"

    it("Editing User Details -TEC5", () => {
        cy.visit("https://timegram-8ecdc.web.app/login")
        cy.login() //logging in
        cy.wait(10000)
        cy.url().should("eq", "https://timegram-8ecdc.web.app/dashboard")
        cy.wait(5000)
        //clicking on teams section
        cy.get("#Team > .index_linkText__d9gMy > .index_textWhite__OiHF8").should("be.visible").click()
        cy.url("https://timegram-8ecdc.web.app/team")

        cy.get("#search").should("be.visible").type(name)
        cy.get("#search").should("have.value", name)
        cy.get(".index_nameImgWrapper__WIjsF").should("be.visible").contains(fullName).click()
        cy.get("#firstName").should("be.visible").clear().type(updatedFirstName)
        cy.get("#lastName").should("be.visible").clear().type(updatedLastName)
        cy.get(".index_createButtonWrapper__EBFRm > .ant-btn").should("be.visible").contains("Save").click()
        cy.checkNotificationMessage("Updated Successfully")

        cy.get("#search").should("be.visible").type(updatedFirstName)
        cy.get("#search").should("have.value", updatedFirstName)
        cy.get(".index_nameImgWrapper__WIjsF").should("be.visible").contains(updatedFullName)

        cy.logout() //logging out
    })

    it.only("Checking all fields in sub 'Teams' section, like buttons, text fields, heading, etc - TEC6", () => {
        cy.visit("https://timegram-8ecdc.web.app/login")
        cy.login() //logging in
        cy.wait(10000)

        cy.url().should("eq", "https://timegram-8ecdc.web.app/dashboard")
        cy.wait(5000)

        //clicking on teams section
        cy.get("#Team > .index_linkText__d9gMy > .index_textWhite__OiHF8").should("be.visible").click()
        cy.url("https://timegram-8ecdc.web.app/team")

        cy.xpath("/html/body/div/div/section/section/main/div/div/div/div[1]/div[1]/div/div[2]/div").should("be.visible").contains("Teams").click()
        cy.get("#search").should("be.visible")
        cy.get(".ant-btn").should("be.visible").contains("Add Team")

        const teamHeading = ["Team", "Members", "Team Lead", "Projects", "Date Created"]
        teamHeading.forEach((heading, index) => {
            cy.get(`.ant-table-thead > tr > :nth-child(${index + 1})`).should("be.visible").contains(heading)
        })

        cy.get(".ant-pagination").should("be.visible") // checking pagination field on the page
        cy.get("#search").should("be.visible").type("Automation Team 2").should("have.value", "Automation Team 2")
        cy.get(".ant-table-row > :nth-child(1)").should("be.visible").contains("Automation Team 2")
    })

    it("Checking all the required fields in the Add Team's drawer - TEC7", () => {
        cy.visit("https://timegram-8ecdc.web.app/login")
        cy.login() //logging in
        cy.wait(10000)

        cy.url().should("eq", "https://timegram-8ecdc.web.app/dashboard")
        cy.wait(5000)

        //clicking on teams section
        cy.get("#Team > .index_linkText__d9gMy > .index_textWhite__OiHF8").should("be.visible").click()
        cy.url("https://timegram-8ecdc.web.app/team")

        cy.xpath("/html/body/div/div/section/section/main/div/div/div/div[1]/div[1]/div/div[2]/div").should("be.visible").contains("Teams").click()
        cy.get(".ant-btn").should("be.visible").contains("Add Team").click()
        cy.get(".ant-drawer-title > div.undefined > .undefined").should("be.visible").contains("Add Team")

        cy.get(".ant-col-lg-21 > .ant-form-item > .ant-row > .ant-form-item-label > .ant-form-item-required").should("be.visible").contains("Team Name")
        cy.get("#name").should("be.visible")
        cy.get(":nth-child(2) > .ant-col-lg-24 > #area > .ant-form-item > .ant-row > .ant-form-item-label > .ant-form-item-required").should("be.visible").contains("Teammates")
        cy.get("#area > .ant-form-item > .ant-row > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-overflow").should("be.visible")
        cy.get(":nth-child(3) > .ant-col-lg-24 > #area > .ant-form-item > .ant-row > .ant-form-item-label").should("be.visible").contains("Team Lead")
        cy.get("#teamLead").should("be.visible")
        cy.get("#projectArea > .ant-form-item > .ant-row > .ant-form-item-label > label").should("be.visible").contains("Projects")
        cy.get("#projectArea > .ant-form-item > .ant-row > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-overflow").should("be.visible")
        cy.get(".index_createButtonWrapper__4MzTo > .ant-btn").should("be.visible").contains("Create")

        cy.closingDrawer() //closing the drawer
        cy.logout() //logging out
    })

    it("Creating Team by filling all fields - TEC8", () => {
        cy.visit("https://timegram-8ecdc.web.app/login")
        cy.login() //logging in
        cy.wait(10000)

        cy.url().should("eq", "https://timegram-8ecdc.web.app/dashboard")
        cy.wait(5000)

        //clicking on teams section
        cy.get("#Team > .index_linkText__d9gMy > .index_textWhite__OiHF8").should("be.visible").click()
        cy.url("https://timegram-8ecdc.web.app/team")

        cy.xpath("/html/body/div/div/section/section/main/div/div/div/div[1]/div[1]/div/div[2]/div").should("be.visible").contains("Teams").click()
        cy.get(".ant-btn").should("be.visible").contains("Add Team").click()

        cy.get("#name").should("be.visible").type("Testing Team 1").should("have.value", "Testing Team 1")
        cy.get("#area > .ant-form-item > .ant-row > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-overflow").should("be.visible").click()
        cy.get(".ant-select-dropdown").should("be.visible")
            .type("{downarrow}{enter}")
    })
})