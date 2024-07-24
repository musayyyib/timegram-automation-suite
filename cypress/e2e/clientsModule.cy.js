describe("Clients Module All Cases", () => {

    let ExistingClientName = "Client One"

    before(() => {
        cy.clearAllSessionStorage(); //clearing the session storage
        cy.clearAllLocalStorage();
        cy.clearIndexedDB();
    })

    beforeEach(() => {
        cy.handleUncaughtException(); //handling uncaught exception
        cy.viewport(1300, 660); //increasing the size of the page to get full view of the application
    })

    it.only("Only Login Test", () => {
        cy.visit("https://timegram-8ecdc.web.app/login")
        cy.wait(5000)
        cy.login()
        cy.wait(10000)
        cy.url().should("eq", "https://timegram-8ecdc.web.app/dashboard")
        cy.wait(5000)
    })
   
   
    it("Checking All the fields on Clients Page - CMC 1", () => {
        cy.visit("https://timegram-8ecdc.web.app/login")
        cy.wait(5000)
        cy.login()
        cy.wait(10000)
        cy.url().should("eq", "https://timegram-8ecdc.web.app/dashboard")
        cy.wait(5000)

        cy.get("#Clients > .index_linkText__d9gMy > .index_textWhite__OiHF8").should("be.visible").click()  //clicking on clients icon
        cy.url().should("eq", "https://timegram-8ecdc.web.app/clients")
        cy.get(".index_dashboardHeaderRoot__grFKm").should("be.visible").contains("Clients") //checking clients heading is visible or not
        cy.get("#search").should("be.visible").type(ExistingClientName) //checking search field is visible or not
        cy.get(".ant-btn").should("be.visible").contains("Add New Client")  //checking add new client button is visible or not
        
        const clientHeadings = ["Client Name", "Client Email", "Company", "Projects"]
        clientHeadings.forEach((heading, index) => {
            cy.get(`.ant-table-thead > tr > :nth-child(${index + 1})`).contains(heading)
        })
        cy.get(".ant-pagination").should("be.visible")  //checking pagination is visible or not
    })
    
    it("Checking All the fields on Clients Drawer - CMC 2", () => {
        cy.visit("https://timegram-8ecdc.web.app/clients")
        cy.wait(7000)
        cy.url().should("eq", "https://timegram-8ecdc.web.app/clients")

        cy.get(".ant-btn").should("be.visible").click() //clicking on add client button
        cy.get(".ant-drawer-body").should("be.visible") //checking drawer opened or not
        cy.get(".ant-drawer-title").should("be.visible").contains("Add Client") //checking heading
        cy.get(".index_note__2Ui4E").should("be.visible").contains("Note: Add the billable rate for clients in the Projects module when creating a new project. This enables you to have different billable rates for each project of the same client.")
        cy.get(".ant-form-item-required > :nth-child(1)").should("be.visible").contains("Client Name")
        cy.get(":nth-child(2) > .ant-form-item > .ant-row > .ant-form-item-label > label > :nth-child(1)").should("be.visible").contains("Client Email")
        cy.get("#clientName").should("be.visible")
        cy.get(":nth-child(2) > :nth-child(1) > .ant-form-item > .ant-row > .ant-form-item-label > label").should("be.visible").contains("Client Phone No.")
        cy.get("#clientEmail").should("be.visible")
        cy.get(":nth-child(2) > :nth-child(2) > .ant-form-item > .ant-row > .ant-form-item-label > label").should("be.visible").contains("Company Name")
        cy.get("#phoneNumber").should("be.visible")
        cy.get(":nth-child(3) > .ant-row > .ant-form-item-label > label").should("be.visible").contains("Client Address")
        cy.get("#address").should("be.visible")
        cy.get(":nth-child(4) > :nth-child(1) > .ant-form-item > .ant-row > .ant-form-item-label").should("be.visible").contains("Invoice Prefix")
        cy.get("#prefix").should("be.visible")
        cy.get(":nth-child(4) > :nth-child(2) > .ant-form-item > .ant-row > .ant-form-item-label > label").should("be.visible").contains("Invoice Serial")
        cy.get("#serial").should("be.visible")
        cy.get(".index_createButtonWrapper__oVN-x > .ant-btn").should("be.visible").contains("Add")
    })

    it("Clicking on Add button without filling fields - CMC 3", () => {
        cy.visit("https://timegram-8ecdc.web.app/clients")
        cy.wait(7000)
        cy.url().should("eq", "https://timegram-8ecdc.web.app/clients")

        cy.get(".ant-btn").should("be.visible").click() //clicking on add client button
        cy.get(".ant-drawer-body").should("be.visible") //checking drawer opened or not
        cy.get(".index_createButtonWrapper__oVN-x > .ant-btn").should("be.visible").contains("Add").click()
        cy.get("#clientName_help > .ant-form-item-explain-error").should("be.visible").contains("Please enter client name")
        cy.get("#clientEmail_help > .ant-form-item-explain-error").should("be.visible").contains("Please input an email")
    })

    const newClientName = "New Client", newClientEmail = "newclient@yopmail.com"

    it("Adding Client by filling all the required fields - CMC 4", () => {
        cy.visit("https://timegram-8ecdc.web.app/clients")
        cy.wait(7000)
        cy.url().should("eq", "https://timegram-8ecdc.web.app/clients")

        cy.get(".ant-btn").should("be.visible").click() //clicking on add client button
        cy.get(".ant-drawer-body").should("be.visible") //checking drawer opened or not
        cy.get("#clientName").should("be.visible").type(newClientName).should("have.value", newClientName)  //entering client name
        cy.get("#clientEmail").should("be.visible").type(newClientEmail).should("have.value", newClientEmail)   //entering client email
        cy.get(".index_createButtonWrapper__oVN-x > .ant-btn").should("be.visible").contains("Add").click() //clicking on add button
        cy.wait(2000)   //waiting for the noification
        cy.checkNotificationMessage("Client Added Successfully")    //checking notification message

        cy.get("#search").type(newClientName)  //searching added client
        cy.get(".index_projectTitle__BdpNP").should("be.visible").contains(newClientName)   //verifing added client
    })

    const editedClientName = "Edited Client", editedClientEmail = "editedclient@yopmail.com"

    it.only("Editing Client details - CMC 5", () => {
        cy.visit("https://timegram-8ecdc.web.app/clients")
        cy.wait(7000)
        cy.url().should("eq", "https://timegram-8ecdc.web.app/clients")

        cy.get("#search").type(newClientName)  //searching added client
        cy.get(".index_projectTitle__BdpNP").should("be.visible").contains(newClientName).click()   //clicking on searched client
        cy.get("#clientName").clear().type(editedClientName).should("have.value", editedClientName)
        cy.get("#clientEmail").clear().type(editedClientEmail).should("have.value", editedClientEmail)
        cy.get(".index_createButtonWrapper__oVN-x > .ant-btn").should("be.visible").contains("Update").click()
        cy.wait(2000)
        cy.checkNotificationMessage("Client Updated Successfully")
        cy.get("#search").type(editedClientName).should("have.value", editedClientName)
        cy.get(".index_projectTitle__BdpNP").should("be.visible").contains(editedClientName)
    })
})