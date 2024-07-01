const { generateUniqueEmail, generateUniqueName, staggingURL, getAppUrl } = require('../utils');

describe("Teams User Module All Cases", () => {

    let uniqueEmail;
    let uniqueFirstName;
    let uniqueLastName;
    let uniqueFullName;
    let processURL;

    before(() => {
        cy.clearAllSessionStorage(); //clearing the session storage
        cy.clearAllLocalStorage();
        cy.clearIndexedDB();
    })

    beforeEach(() => {
        cy.handleUncaughtException(); //handling uncaught exception
        cy.viewport(1300, 660); //increasing the size of the page to get full view of the application
    })

    uniqueEmail = generateUniqueEmail();
    const { uniqueFirstName: firstName, uniqueLastName: lastName, uniqueFullName: fullName } = generateUniqueName();
    uniqueFirstName = firstName;
    uniqueLastName = lastName;
    uniqueFullName = fullName;

    it("Team Module (Users Tab) - Positive Case - T1", () => {
        cy.visit("https://timegram-8ecdc.web.app/login")
        cy.wait(5000)
        cy.login()
        cy.wait(10000)
        cy.url().should("eq", "https://timegram-8ecdc.web.app/dashboard")
        cy.wait(5000)
        cy.get("#Team > .index_linkText__d9gMy > .index_textWhite__OiHF8").should("be.visible").click()
        cy.url().should("eq", "https://timegram-8ecdc.web.app/team")

        cy.get(".index_dashboardHeaderRoot__grFKm").should("be.visible").contains("Team")//checking header text
        cy.xpath("/html/body/div[1]/div/section/section/main/div[2]/div/div/div[1]/div[1]/div/div[1]/div").should("be.visible").contains("Users")//checking users sub section
        cy.xpath("/html/body/div[1]/div/section/section/main/div[2]/div/div/div[1]/div[1]/div/div[2]/div").should("be.visible").contains("Teams")//checking teams sub section
        cy.get(".ant-btn > :nth-child(2)").should("be.visible").contains("Add User")//checking add user button
        cy.get("#search").should("be.visible")//checking search user field
        cy.get(":nth-child(2) > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector").should("be.visible")//checking filter by role field
        cy.get(":nth-child(3) > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector").should("be.visible")//checking filter by team field
        cy.get(".ant-pagination").should("be.visible")
    })

    it("Checking All fields on the Add User Modal - AU1", () => {
        cy.visit("https://timegram-8ecdc.web.app/team")
        cy.wait(2000)
        cy.url().should("eq", "https://timegram-8ecdc.web.app/team")
        cy.wait(5000)

        cy.get(".ant-btn > :nth-child(2)").should("be.visible").contains("Add User").click() //clicking on add user button
        cy.get(".ant-modal-body").should("be.visible")  //checking modal is appearing or not
        cy.get(".index_modalHeading__3v0Ie > .undefined").should("be.visible").contains("Add User")
        cy.get("#userEmails_0_email").should("be.visible")  //checking email field is visible or not
        cy.get("#userEmails_0_capacityRate").should("be.visible").should("have.value", "32") // checking capacity rate field and value
        cy.get("#userEmails_0_costRate").should("be.visible").should("have.value", "25") // checking cost rate field and value
        cy.get(".ant-col-lg-11 > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector").should("have.visible").click()   //checking and clicking acess levle
        cy.get(".ant-select-dropdown").should("be.visible") //checking dropdown is visible or not
        cy.get(".index_adminDiv__V1ezu").should("be.visible").contains("Admin") //checking admin is visible or not
        cy.get(".index_managerDiv__obaOp").should("be.visible").contains("Manager") //checking manager is visible or not
        cy.get(".index_userDiv__8O-6s").should("be.visible").contains("User")   //checking user is visible or not

        cy.xpath("/html/body/div[2]/div/div[2]/div/div[2]/div[1]/form/div[2]/div[1]/div/div/div/div[2]/div/div/div/div/div/div/h1").should("be.visible").contains("Add another user").click() //checking add more button
        cy.get("#userEmails_1_email").should("be.visible") //checking second email field is visible or not
        cy.get("#userEmails_1_capacityRate").should("be.visible").should("have.value", "32") // checking second capacity rate field and value
        cy.get("#userEmails_1_costRate").should("be.visible").should("have.value", "25") // checking second cost rate field and value
        cy.get(":nth-child(2) > :nth-child(2) > .anticon").should("be.visible").click() //checking and clicking remove button

        cy.get(".ant-modal-footer > .ant-btn-primary").should("be.visible").contains("Send Invite") // checking send invite button
        cy.get(".ant-btn-default").should("be.visible").contains("Cancel").click() //checking cancel button
        cy.get(".ant-modal-body").should("not.be.visible") //checking modal is closed or not
    })

    it("Adding One User - Positive Flow - AU2", () => {
        cy.visit("https://timegram-8ecdc.web.app/team")
        cy.wait(2000)
        cy.url().should("eq", "https://timegram-8ecdc.web.app/team")
        cy.wait(5000)

        cy.get(".ant-btn > :nth-child(2)").should("be.visible").contains("Add User").click() //clicking on add user button
        cy.get("#userEmails_0_email").should("be.visible").type(uniqueEmail).should("have.value", uniqueEmail)
        cy.get("#userEmails_0_capacityRate").should("be.visible").should("have.value", "32")
        cy.get("#userEmails_0_costRate").should("be.visible").should("have.value", "25")
        cy.get(".ant-col-lg-11 > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector").should("have.visible").click()
        cy.get(".ant-select-dropdown").should("be.visible")
        cy.get(".index_userDiv__8O-6s").should("be.visible").contains("User").click()
        cy.get(".ant-modal-footer > .ant-btn-primary").should("be.visible").contains("Send Invite").click()
        cy.wait(7000)
        cy.checkNotificationMessage("Invite(s) sent successfully")

        cy.get("#search").should("be.visible").type(uniqueEmail)
        cy.xpath("/html/body/div[1]/div/section/section/main/div[2]/div/div/div[2]/div/div/div/div[2]/div[2]/div/div/div/div/div/div/div/div/table/tbody/tr[2]/td[3]/span").should("be.visible").contains(uniqueEmail)
    })

    it("Adding Existing User - Negative Flow - AU3", () => {
        cy.visit("https://timegram-8ecdc.web.app/team")
        cy.wait(2000)
        cy.url().should("eq", "https://timegram-8ecdc.web.app/team")
        cy.wait(5000)

        cy.get(".ant-btn > :nth-child(2)").should("be.visible").contains("Add User").click() //clicking on add user button
        cy.get("#userEmails_0_email").should("be.visible").type(uniqueEmail).should("have.value", uniqueEmail)  //adding existing email in the email field
        cy.get(":nth-child(2) > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-number").should("be.visible").click()   //clicking on capacity rate field
        cy.get(".ant-form-item-explain-error").should("be.visible").contains("This email already exists in organization")   //checking error message on the field
    })

    it("Clicking on Send Invite button without filling all the required fields -Negative Case - AU4", () => {
        cy.visit("https://timegram-8ecdc.web.app/team")
        cy.wait(2000)
        cy.url().should("eq", "https://timegram-8ecdc.web.app/team")
        cy.wait(5000)

        cy.get(".ant-btn > :nth-child(2)").should("be.visible").contains("Add User").click() //clicking on add user button
        cy.get(".ant-modal-footer > .ant-btn-primary").should("be.visible").contains("Send Invite").click() //clicking on send invite button
        cy.get("#userEmails_0_email_help > .ant-form-item-explain-error").should("be.visible").contains("Please input an email") //checking error message on the email field
        cy.get("#userEmails_0_accessLevel_help > .ant-form-item-explain-error").should("be.visible").contains("Please select access level") //checking error message on the access level field
        cy.get(".ant-modal-body").should("be.visible")  //checking modal is appearing or not
    })

    it("Editing User Details - AU5", () => {
        cy.visit("https://timegram-8ecdc.web.app/team")
        cy.wait(2000)
        cy.url().should("eq", "https://timegram-8ecdc.web.app/team")
        cy.wait(5000)

        console.log(uniqueEmail)
        cy.get("#search").should("be.visible").type(uniqueEmail)
        cy.get("#search").should("have.value", uniqueEmail)
        cy.get(".index_nameImgWrapper__WIjsF").should("be.visible").click()
        cy.get("#firstName").should("be.visible").clear().type(uniqueFirstName)
        cy.get("#lastName").should("be.visible").clear().type(uniqueLastName)
        cy.get(".index_createButtonWrapper__EBFRm > .ant-btn").should("be.visible").contains("Save").click()
        cy.checkNotificationMessage("Updated Successfully")

        cy.get("#search").should("be.visible").type(uniqueFirstName)
        cy.get("#search").should("have.value", uniqueFirstName)
        cy.get(".index_nameImgWrapper__WIjsF").should("be.visible").contains(uniqueFullName)
    })
    
    it("Applying Role Filter to check User Accordingly - Positive Case - AU6", () => {
        cy.visit("https://timegram-8ecdc.web.app/team")
        cy.wait(2000)
        cy.url().should("eq", "https://timegram-8ecdc.web.app/team")
        cy.wait(5000)

        cy.get(":nth-child(2) > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector").should("be.visible").click()
        cy.get(".ant-select-dropdown").should("be.visible")
        cy.get(":nth-child(1) > .ant-select-item-option-content > .index_imgTextWrapper__c9Edd").should("be.visible").contains("All")
        cy.get(":nth-child(2) > .ant-select-item-option-content > .index_imgTextWrapper__c9Edd").should("be.visible").contains("Admin")
        cy.get(":nth-child(3) > .ant-select-item-option-content > .index_imgTextWrapper__c9Edd").should("be.visible").contains("Manager")
        cy.get(":nth-child(4) > .ant-select-item-option-content > .index_imgTextWrapper__c9Edd").should("be.visible").contains("User").click()
        cy.wait(2000)
        cy.get('#rc-tabs-2-panel-Users > div > div.index_pageWrapper__5So5m > div:nth-child(2) > div > div > div > div > div > div > div > div > table > tbody > tr.ant-table-row.ant-table-row-level-0 > td:nth-child(2) > span').should("be.visible").contains("user")
    })

    it("Searching Existing User - Positive Case - AU7", () => {
        cy.visit("https://timegram-8ecdc.web.app/team")
        cy.wait(2000)
        cy.url().should("eq", "https://timegram-8ecdc.web.app/team")
        cy.wait(5000)

        cy.get("#search").should("be.visible").type(uniqueFullName)
        cy.get(2000)
        cy.get(".index_nameImgWrapper__WIjsF").should("be.visible").should("have.text", uniqueFullName)
        cy.get(".index_emailOverflow__sKu3H").should("be.visible").should("have.text", uniqueEmail)
    })

    it("Adding One User - Positive Flow - AU2", () => {
        cy.visit("https://timegram-8ecdc.web.app/team")
        cy.wait(2000)
        cy.url().should("eq", "https://timegram-8ecdc.web.app/team")
        cy.wait(5000)

        cy.get(".ant-btn > :nth-child(2)").should("be.visible").contains("Add User").click() //clicking on add user button
        cy.get("#userEmails_0_email").should("be.visible").type("testinguser00@yopmail.com").should("have.value", "testinguser00@yopmail.com")
        cy.get("#userEmails_0_capacityRate").should("be.visible").should("have.value", "32")
        cy.get("#userEmails_0_costRate").should("be.visible").should("have.value", "25")
        cy.get(".ant-col-lg-11 > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector").should("have.visible").click()
        cy.get(".index_userDiv__8O-6s").should("be.visible").contains("User").click()
        cy.get(".ant-modal-footer > .ant-btn-primary").should("be.visible").contains("Send Invite").click()
        cy.wait(10000)

        cy.get(".ant-btn > :nth-child(2)").should("be.visible").contains("Add User").click() //clicking on add user button
        cy.get("#userEmails_0_email").should("be.visible").type("testinguser02@yopmail.com").should("have.value", "testinguser02@yopmail.com")
        cy.get("#userEmails_0_capacityRate").should("be.visible").should("have.value", "32")
        cy.get("#userEmails_0_costRate").should("be.visible").should("have.value", "25")
        cy.get(".ant-col-lg-11 > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector").should("have.visible").click()
        cy.get(".index_userDiv__8O-6s").should("be.visible").contains("User").click()
        cy.get(".ant-modal-footer > .ant-btn-primary").should("be.visible").contains("Send Invite").click()
        cy.wait(10000)

        cy.get(".ant-btn > :nth-child(2)").should("be.visible").contains("Add User").click() //clicking on add user button
        cy.get("#userEmails_0_email").should("be.visible").type("testinguser03@yopmail.com").should("have.value", "testinguser03@yopmail.com")
        cy.get("#userEmails_0_capacityRate").should("be.visible").should("have.value", "32")
        cy.get("#userEmails_0_costRate").should("be.visible").should("have.value", "25")
        cy.get(".ant-col-lg-11 > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector").should("have.visible").click()
        cy.get(".index_userDiv__8O-6s").should("be.visible").contains("User").click()
        cy.get(".ant-modal-footer > .ant-btn-primary").should("be.visible").contains("Send Invite").click()
        cy.wait(10000)

        cy.get(".ant-btn > :nth-child(2)").should("be.visible").contains("Add User").click() //clicking on add user button
        cy.get("#userEmails_0_email").should("be.visible").type("testinguser04@yopmail.com").should("have.value", "testinguser04@yopmail.com")
        cy.get("#userEmails_0_capacityRate").should("be.visible").should("have.value", "32")
        cy.get("#userEmails_0_costRate").should("be.visible").should("have.value", "25")
        cy.get(".ant-col-lg-11 > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector").should("have.visible").click()
        cy.get(".index_userDiv__8O-6s").should("be.visible").contains("User").click()
        cy.get(".ant-modal-footer > .ant-btn-primary").should("be.visible").contains("Send Invite").click()
        cy.wait(10000)
    })
})