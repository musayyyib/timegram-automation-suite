const { generateUniqueEmail, generateUniqueName, staggingURL, getAppUrl } = require('../utils');

describe("Teams Section Teams Module All Cases", () => {

    let uniqueFullName
    let uniqueFirstName

    before(() => {
        cy.clearAllSessionStorage(); //clearing the session storage
        cy.clearAllLocalStorage();
        cy.clearIndexedDB();
    })

    beforeEach(() => {
        cy.handleUncaughtException(); //handling uncaught exception
        cy.viewport(1300, 660); //increasing the size of the page to get full view of the application
    })

    const { uniqueFullName: teamName, uniqueFirstName: updatedName } = generateUniqueName();
    uniqueFullName = teamName
    uniqueFirstName = updatedName

    it("Checking All the fields on the Teams section - TMC 1", () => {
        cy.visit("https://timegram-8ecdc.web.app/login")
        cy.wait(5000)
        cy.login()
        cy.wait(10000)
        cy.url().should("eq", "https://timegram-8ecdc.web.app/dashboard")
        cy.wait(5000)
        cy.get("#Team > .index_linkText__d9gMy > .index_textWhite__OiHF8").should("be.visible").click()
        cy.url().should("eq", "https://timegram-8ecdc.web.app/team")
        cy.xpath("/html/body/div/div/section/section/main/div[2]/div/div/div[1]/div[1]/div/div[2]/div").should("be.visible").contains("Teams").click() //clicking on teams section on teams page
        cy.get(".index_dashboardHeaderRoot__grFKm").should("be.visible").contains("Team") //checking team heading is visible or not

        cy.get("#search").should("be.visible").type(teamName) //checking search field is visible or not
        cy.get(".ant-btn").should("be.visible").contains("Add Team") //checking button text correct or not
    })

    it("Checking All the Required fields in the Add Team's Drawer - TMC 2", () => {
        cy.visit("https://timegram-8ecdc.web.app/team")
        cy.wait(7000)
        cy.url().should("eq", "https://timegram-8ecdc.web.app/team")
        cy.xpath("/html/body/div/div/section/section/main/div[2]/div/div/div[1]/div[1]/div/div[2]/div").should("be.visible").contains("Teams").click() //clicking on teams section on teams page
        cy.wait(7000)
//46
        cy.get(".ant-btn").should("be.visible").contains("Add Team").click() //clicking on add team button
        cy.get(".ant-drawer-title").should("be.visible").contains("Add Team") //checking add team heading on the drawer
        cy.get(".index_closeIconWrapper__OesUG").should("be.visible") //checking the close icon is available or not
        cy.get(".scrollbar-container").should("be.visible") //checking container is visible or not
        cy.get(".ant-col-lg-21 > .ant-form-item > .ant-row > .ant-form-item-label").should("be.visible").contains("Team Name") //checking team name field is visible or not
        cy.get("#name").should("be.visible") //checking team name text field is visible or not
        cy.get(":nth-child(2) > .ant-col-lg-24 > #area > .ant-form-item > .ant-row > .ant-form-item-label").should("be.visible").contains("Teammates") //checking teammates field is visible or not
        cy.get(":nth-child(2) > .ant-col-lg-24 > #area > .ant-form-item > .ant-row > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector").should("be.visible")   //checking teammates dropdown is visible or not
        cy.get(":nth-child(3) > .ant-col-lg-24 > #area > .ant-form-item > .ant-row > .ant-form-item-label").should("be.visible").contains("Team Lead") //checking team lead field is visible or not
        cy.get("#teamLead").should("be.visible") //checking team lead dropdown is visible or not
        cy.get("#projectArea > .ant-form-item > .ant-row > .ant-form-item-label").should("be.visible").contains("Projects") //checking projects field is visible or not
        cy.get("#projectArea > .ant-form-item > .ant-row > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-overflow").should("be.visible")    //checking projects dropdown is visible or not
        cy.get(".index_createButtonWrapper__4MzTo > .ant-btn").should("be.visible").contains("Create") //checking create button is visible or not
    })

    it("Clicking on Create button by not filling fields - Negative - TMC 3", () => {
        cy.visit("https://timegram-8ecdc.web.app/team")
        cy.wait(7000)
        cy.url().should("eq", "https://timegram-8ecdc.web.app/team")
        cy.xpath("/html/body/div/div/section/section/main/div[2]/div/div/div[1]/div[1]/div/div[2]/div").should("be.visible").contains("Teams").click() //clicking on teams section on teams page
        cy.wait(7000)

        cy.get(".ant-btn").should("be.visible").contains("Add Team").click() //clicking on add team button
        cy.get(".index_createButtonWrapper__4MzTo > .ant-btn").should("be.visible").contains("Create").click() //clicking on create button
        cy.get("#name_help > .ant-form-item-explain-error").should("be.visible").contains("Please enter a team name")   //checking team name error
        cy.get("#newMembers_help > .ant-form-item-explain-error").should("be.visible").contains("Please select user") //checking team members error
        cy.get("#teamLead_help > .ant-form-item-explain-error").should("be.visible").contains("Please select user") //checking team lead error
    })

    it("Creating Team by filling all the required fields - Positive - TMC 4", () => {
        cy.visit("https://timegram-8ecdc.web.app/team")
        cy.wait(7000)
        cy.url().should("eq", "https://timegram-8ecdc.web.app/team")
        cy.xpath("/html/body/div/div/section/section/main/div[2]/div/div/div[1]/div[1]/div/div[2]/div").should("be.visible").contains("Teams").click() //clicking on teams section on teams page
        cy.wait(7000)

        cy.get(".ant-btn").should("be.visible").contains("Add Team").click() //clicking on add team button
        cy.get("#name").should("be.visible").type(teamName).should("have.value", teamName) //adding team name
        cy.get(":nth-child(2) > .ant-col-lg-24 > #area > .ant-form-item > .ant-row > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector").should("be.visible").click()
        cy.get(".ant-select-dropdown").should("be.visible")
            .type("{downarrow}{enter}")
        cy.get(":nth-child(2) > .ant-col-lg-24 > #area > .ant-form-item > .ant-row > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector").click()

        cy.get("#teamLead").should("be.visible").click()
        cy.xpath("/html/body/div[2]/div/div[3]/div/div/div[2]/form/div[2]/div[1]/div[3]/div/div/div/div/div[2]/div/div/div/div/span[1]/input").should("be.visible")
            .type("{enter}")

        cy.get(".index_createButtonWrapper__4MzTo > .ant-btn").should("be.visible").contains("Create").click()
        cy.wait(4000)
        cy.checkNotificationMessage("Team created") //checking team created successfully or not
        cy.xpath("/html/body/div/div/section/section/main/div[2]/div/div/div[1]/div[1]/div/div[2]/div").should("be.visible").contains("Teams").click() //clicking on teams section on teams page
        cy.get("#search").should("be.visible").type(teamName) //checking search field is visible or not
        cy.wait(2000)
        //cy.xpath("/html/body/div[1]/div/section/section/main/div[4]/div/div/div[2]/div/div/div[2]/div[2]/div/div/div/div/div/div/table/tbody/tr[2]/td[1]").should("be.visible").should("have.text", teamName + "&nbsp;") //checking team name is visible or not
        cy.get(".ant-table-row > :nth-child(1)").should("be.visible").click()
        cy.get("#name").should("be.visible").should("have.value", teamName) //checking team name is visible or not
    })

    it("Searching Team on the Projects Page - Positive - TMC 5", () => {
        cy.visit("https://timegram-8ecdc.web.app/team")
        cy.wait(5000)
        cy.url().should("eq", "https://timegram-8ecdc.web.app/team")
        cy.xpath("/html/body/div/div/section/section/main/div[2]/div/div/div[1]/div[1]/div/div[2]/div").should("be.visible").contains("Teams").click() //clicking on teams section on teams page

        cy.wait(7000)
        cy.get(".ant-table-row > :nth-child(1)").should("be.visible").click()
        cy.get("#name").should("be.visible").should("have.value", teamName) //checking team name is visible or not
    })

    it("Editing Existing Team - Positive - TMC 6", () => {
        cy.visit("https://timegram-8ecdc.web.app/team")
        cy.wait(7000)
        cy.url().should("eq", "https://timegram-8ecdc.web.app/team")
        cy.xpath("/html/body/div/div/section/section/main/div[2]/div/div/div[1]/div[1]/div/div[2]/div").should("be.visible").contains("Teams").click() //clicking on teams section on teams page
        cy.wait(7000)

        cy.get("#search").should("be.visible").type(teamName) //checking search field is visible or not
        cy.wait(2000)
      //124
        cy.get(".ant-table-row > :nth-child(1)").should("be.visible").click()   //clicking on team
        cy.get("#name").should("be.visible").clear().type(updatedName).should("have.value", updatedName)    //updating team name
        cy.get(".index_createButtonWrapper__4MzTo > .ant-btn").should("be.visible").contains("Save").click() //clicking on save button
        cy.wait(3000)
        cy.checkNotificationMessage("Updated Successfully")

        cy.xpath("/html/body/div/div/section/section/main/div[2]/div/div/div[1]/div[1]/div/div[2]/div").should("be.visible").contains("Teams").click() //clicking on teams section on teams page
        cy.get("#search").should("be.visible").type(updatedName) //checking search field is visible or not
        cy.get(".ant-table-row > :nth-child(1)").should("be.visible").click()   //clicking on team
        cy.get("#name").should("be.visible").should("have.value", updatedName)
    })

    it("Adding User in the Existing Team - Positive - TMC 7", () => {
       cy.visit("https://timegram-8ecdc.web.app/team")
        cy.wait(5000)
        cy.url().should("eq", "https://timegram-8ecdc.web.app/team")
        cy.xpath("/html/body/div/div/section/section/main/div[2]/div/div/div[1]/div[1]/div/div[2]/div").should("be.visible").contains("Teams").click() //clicking on teams section on teams page
        cy.wait(7000)

        cy.get("#search").should("be.visible").type(updatedName) //checking search field is visible or not
        cy.wait(2000)

        cy.get(":nth-child(2) > .anticon").should("be.visible").click() //clicking on add icon
        cy.get(".ant-select-selection-overflow").should("be.visible").click().type("{downarrow}{enter}") //clicking on delete icon
        cy.get(".ant-popover-inner-content > .ant-btn").should("be.visible").contains("Save").click() //clicking on delete button

        cy.wait(3000)
        cy.checkNotificationMessage("Updated Successfully")
    })
    it("Removing User from the Existing Team - Positive - TMC 8", () => {
        cy.visit("https://timegram-8ecdc.web.app/team")
        cy.wait(5000)
        cy.url().should("eq", "https://timegram-8ecdc.web.app/team")
        cy.xpath("/html/body/div/div/section/section/main/div[2]/div/div/div[1]/div[1]/div/div[2]/div").should("be.visible").contains("Teams").click() //clicking on teams section on teams page
        cy.wait(7000)

        cy.get("#search").should("be.visible").type(updatedName) //checking search field is visible or not
        cy.wait(2000)

        cy.get(":nth-child(2) > .anticon").should("be.visible").click() //clicking on delete icon
        cy.get(".ant-select-selection-overflow").should("be.visible").click().type("{downarrow}{enter}") //clicking on delete icon
        cy.get(".ant-popover-inner-content > .ant-btn").should("be.visible").contains("Save").click() //clicking on delete button

        cy.wait(3000)
        cy.checkNotificationMessage("Updated Successfully")
    })

    it("Checking All the fields on the Teams section After Team Addition - TMC 9", () => {
        cy.visit("https://timegram-8ecdc.web.app/team")
        cy.wait(5000)
        cy.url().should("eq", "https://timegram-8ecdc.web.app/team")
        cy.xpath("/html/body/div/div/section/section/main/div[2]/div/div/div[1]/div[1]/div/div[2]/div").should("be.visible").contains("Teams").click() //clicking on teams section on teams page
        cy.wait(7000)

        cy.get("#search").should("be.visible").type(teamName).should("have.value", teamName) //checking search field is visible or not
        cy.get("#search").click().clear() //clearing the search field
        cy.get(".ant-btn").should("be.visible").contains("Add Team") //checking button text correct or not

        const teamHeading = ["Team", "Members", "Team Lead", "Projects", "Date Created"]
        teamHeading.forEach((heading, index) => {
            cy.get(`.ant-table-thead > tr > :nth-child(${index + 1})`).should("be.visible").contains(heading)
        }) //checking table headings are visible and correct or not

        cy.get(".ant-pagination").should("be.visible") // checking pagination field on the page
    })

})