describe("Projects Page Test", () => {

    beforeEach(() => {
        cy.handleUncaughtException(); //handling uncaught exception
        cy.viewport(1300, 660); //increasing the size of the page to get full view of the application
        cy.clearAllSessionStorage(); //clearing the session storage
        cy.clearAllLocalStorage();
        cy.clearIndexedDB();
    })

    it("Projects Page -- Checking all buttons, filters, tables and small fields - PC1", () => {
        cy.visit("https://timegram-8ecdc.web.app/login")
        cy.wait(5000)
        cy.login()
        cy.wait(10000)
        cy.url().should("eq", "https://timegram-8ecdc.web.app/dashboard")
        cy.get("#Projects > .index_linkText__d9gMy > .index_textWhite__OiHF8").should("be.visible").click()
        cy.url().should("eq", "https://timegram-8ecdc.web.app/projects")

        cy.get(".index_dashboardHeaderRoot__grFKm").should("be.visible").contains("Projects")   //checking projects heading is visible or not
        cy.get(".ant-btn").should("be.visible").contains("Create Project")          //checking create project button is visible or not

        //checking filter by team member is available or not
        cy.get(".ant-select-selector").should("be.visible").click()
        cy.get(".ant-select-dropdown").should("be.visible")
        cy.get(".ant-select-selector").should("be.visible").click()

        //checking show my task only button is visible or not
        cy.get("#myTask").should("be.visible").click()
        cy.get("#myTask").should("be.visible").click()

        //checking show completed button is available or not
        cy.get("#showClosed").should("be.visible").click()
        cy.get("#showClosed").should("be.visible").click()

        //checking create project button opening drawer or not
        cy.get(".ant-btn").should("be.visible").contains("Create Project").click()
        cy.get(".ant-drawer-header").should("be.visible").contains("Create Project")
        cy.get(".index_closeIconWrapper__OesUG").should("be.visible").click()

        const headings = ["Project", "Due Date", "Status", "Expected Time", "Progress", "Team", "Priority"] //checking table headings are visible and correct or not
        headings.forEach(heading => {
            cy.get(`:nth-child(1) > .ant-table-cell`).should("be.visible").contains(heading)
        })
        cy.get(".ant-pagination").should("be.visible")  //checking pagination field on the page
        cy.get("#root > div > section > section > header > div.index_dashboardHeaderRoot__grFKm > div > span > svg").should("be.visible")   //checking reload button is visible or not
    })

    it("Creating Project by filling all the required fields - PC2", () => {
        cy.visit("https://timegram-8ecdc.web.app/login")
        cy.wait(5000)
        cy.login()
        cy.wait(10000)
        cy.url().should("eq", "https://timegram-8ecdc.web.app/dashboard")
        cy.get("#Projects > .index_linkText__d9gMy > .index_textWhite__OiHF8").should("be.visible").click()
        cy.url().should("eq", "https://timegram-8ecdc.web.app/projects")

        cy.get(".ant-btn").should("be.visible").contains("Create Project").click()  //clicking on create project button
        cy.get("#projectName").should("be.visible").type("Without Team Project")    //filling all the required fields
        cy.get("#projectDescription").should("be.visible").type("This project consists Team").should("have.value", "This project consists Team")    //adding description of the project
        cy.get("#projectDueDate").should("be.visible").click()
        cy.get(".ant-picker-header-next-btn").should("be.visible").click()
        cy.get(".ant-picker-content").contains("30").click()
        cy.get(".index_createButtonWrapper__4MzTo > .ant-btn").should("be.visible").click() //clicking on create button
        cy.get(".ant-message-custom-content > :nth-child(2)").should("be.visible").contains("Project Created Successfully") //checking project is created or not
        cy.get(".index_projectPageWrapper__soNsJ").should("be.visible").contains("Without Team Project")
    })

    it("Creating Project with Team - PC3", () => {
        cy.visit("https://timegram-8ecdc.web.app/login")
        cy.wait(5000)
        cy.login()
        cy.wait(10000)
        cy.url().should("eq", "https://timegram-8ecdc.web.app/dashboard")
        cy.get("#Projects > .index_linkText__d9gMy > .index_textWhite__OiHF8").should("be.visible").click()
        cy.url().should("eq", "https://timegram-8ecdc.web.app/projects")


        cy.get(".ant-btn").should("be.visible").contains("Create Project").click()  //clicking on create project button
        cy.get(".index_memberColWrapper__RVzFo > :nth-child(2) > .anticon").should("be.visible").click() //clicking on the quick add pop over
        cy.get(".ant-popover-inner-content").should("be.visible")   //checking pop over is visible or not
        cy.get("#popoverArea > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector").should("be.visible").click().type("{downarrow}{enter}")    //selecting team
        cy.get(".ant-popover-inner-content > .ant-btn").should("be.visible").contains("Save").click()   //clicking on save button
        cy.get("#projectName").should("be.visible").type("With Team Project")    //filling all the required fields
        cy.get("#projectDescription").should("be.visible").type("This project consists Team").should("have.value", "This project consists Team")    //adding description of the project
        cy.get("#projectDueDate").should("be.visible").click()  //selecting due date
        cy.get(".ant-picker-header-next-btn").should("be.visible").click()  //clicking on next month
        cy.get(".ant-picker-content").contains("30").click()    //selecting date
        cy.get(".index_createButtonWrapper__4MzTo > .ant-btn").should("be.visible").click() //clicking on create button
        cy.get(".ant-message-custom-content > :nth-child(2)").should("be.visible").contains("Project Created Successfully") //checking project is created or not
        cy.get(".index_projectPageWrapper__soNsJ").should("be.visible").contains("With Team Project")
    })

    it("Creating Project without filling all the required fields - Negative - PC4", () => {
        cy.visit("https://timegram-8ecdc.web.app/login")
        cy.wait(5000)
        cy.login()
        cy.wait(10000)
        cy.url().should("eq", "https://timegram-8ecdc.web.app/dashboard")
        cy.get("#Projects > .index_linkText__d9gMy > .index_textWhite__OiHF8").should("be.visible").click()
        cy.url().should("eq", "https://timegram-8ecdc.web.app/projects")


        cy.get(".ant-btn").should("be.visible").contains("Create Project").click()  //clicking on create project button
        cy.get("#projectName").should("be.visible").type("Test Project")    //filling all the required fields except due date
        cy.get(".ant-select-selection-overflow").should("be.visible").click()
        cy.get(".index_createButtonWrapper__4MzTo > .ant-btn").should("be.visible").click() //clicking on create button
        cy.get(".ant-form-item-explain-error").should("be.visible").contains("Select date") //checking error on the drawer  
        cy.get(".index_closeIconWrapper__OesUG").should("be.visible").click()   //closing the drawer
        cy.get(".ant-drawer-body").should("not.be.visible") //checking drawer is closed or not
    })

    const clientName = "Client One"

    it("Creating Project with client - Positive - PC5", () => {
        cy.visit("https://timegram-8ecdc.web.app/login")
        cy.wait(5000)
        cy.login()
        cy.wait(10000)
        cy.url().should("eq", "https://timegram-8ecdc.web.app/dashboard")
        cy.get("#Projects > .index_linkText__d9gMy > .index_textWhite__OiHF8").should("be.visible").click()
        cy.url().should("eq", "https://timegram-8ecdc.web.app/projects")

        cy.get(".ant-btn").should("be.visible").contains("Create Project").click()  //clicking on create project button
        cy.get(".index_memberColWrapper__RVzFo > :nth-child(2) > .anticon").should("be.visible").click() //clicking on the quick add pop over
        cy.get(".ant-popover-inner-content").should("be.visible")   //checking pop over is visible or not
        cy.get("#popoverArea > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector").should("be.visible").click().type("{downarrow}{enter}")    //selecting team
        cy.get(".ant-popover-inner-content > .ant-btn").should("be.visible").contains("Save").click()   //clicking on save button
        cy.get("#projectName").should("be.visible").type("With Client Project")    //filling all the required fields
        cy.get("#projectDescription").should("be.visible").type("Client is assigned on project")//.should("have.value", "Client is assigned on project")    //adding description of the project

        cy.get(".index_plusIconWrapper__XPode > .anticon").should("be.visible").click()  //.should("be.visible").contains("Add a Client").click() //clicking on add client
        cy.get(".ant-popover").should("be.visible")   //checking pop over is visible or not
        cy.get("#clientName").should("be.visible").type(clientName)    //Adding client name
        cy.get("#clientEmail").should("be.visible").type("clientemail@yopmail.com")    //Adding client email
        cy.get("#companyName").should("be.visible").type("Company 1")    //Adding Company name
        cy.get("#prefix").should("be.visible").type("CLI")  //adding inv prefix
        cy.get("#serial").should("be.visible").type("123")  //adding inv serial
        cy.get(":nth-child(6) > .ant-btn").should("be.visible").contains("Add Client").click() //clicking on add client button
        cy.get(".ant-popover").should("not.be.visible")   //checking pop closed or not
        cy.get("#hourlyRate").should("be.visible").type("30")    //Adding hourly rate

        cy.get("#projectDueDate").should("be.visible").click()  //selecting due date
        cy.get(".ant-picker-header-next-btn").should("be.visible").click()  //clicking on next month
        cy.get(".ant-picker-content").contains("30").click()    //selecting date
        cy.get(".index_createButtonWrapper__4MzTo > .ant-btn").should("be.visible").click() //clicking on create button
        cy.get(".ant-message-custom-content > :nth-child(2)").should("be.visible").contains("Project Created Successfully") //checking project is created or not
        cy.wait(2000)
        cy.get(".index_projectPageWrapper__soNsJ").should("be.visible").contains("With Client Project").click()
        cy.get(".ant-col-lg-5 > .ant-btn").should("be.visible").contains(clientName)
    })

    const clientName2 = "Client Two"

    it("Assigning New Client to the Existing Project - Positive - PC6", () => {
        cy.visit("https://timegram-8ecdc.web.app/login")
        cy.wait(5000)
        cy.login()
        cy.wait(10000)
        cy.url().should("eq", "https://timegram-8ecdc.web.app/dashboard")
        cy.get("#Projects > .index_linkText__d9gMy > .index_textWhite__OiHF8").should("be.visible").click()
        cy.url().should("eq", "https://timegram-8ecdc.web.app/projects")
        cy.wait(2000)

        cy.get(".index_projectPageWrapper__soNsJ").should("be.visible").contains("Without Team Project").click()
        cy.get(".ant-drawer-body").should("be.visible")
        cy.get(".ant-col-lg-5 > .ant-btn").should("be.visible").contains("Add Client").click()
        cy.get(".ant-modal-body").should("be.visible")
        cy.get(".AddClientModal_addClientHeading__3sGrX").should("be.visible").contains("Add Client")
        cy.xpath("/html/body/div[3]/div/div[2]/div/div[2]/div/div/div[2]/div/div/div/div/div/div/div[1]/div[1]/div/div[1]/div").should("be.visible").contains("Add New Client") //checking Add new client tab is visible or not
        cy.xpath("/html/body/div[3]/div/div[2]/div/div[2]/div/div/div[2]/div/div/div/div/div/div/div[1]/div[1]/div/div[2]/div").should("be.visible").contains("Add Existing Client")    //checking existing client tab is visible or not
        cy.get("#clientName").should("be.visible").type(clientName2)    //Adding client name
        cy.get("#clientEmail").should("be.visible").type("clientemail2@yopmail.com")    //Adding client email
        cy.get("#companyName").should("be.visible").type("Company 1")    //Adding Company name
        cy.get("#hourlyRate").should("be.visible").type("30")    //Adding hourly rate
        cy.get("#prefix").should("be.visible").type("ABC")  //adding inv prefix
        cy.get("#serial").should("be.visible").type("456")  //adding inv serial
        cy.get(":nth-child(7) > .ant-btn").should("be.visible").contains("Save").click()  //clicking on save button
        cy.wait(3000)
        cy.checkNotificationMessage("Project Updated")  //checking notification message
        cy.wait(3000)
        cy.get(".index_projectPageWrapper__soNsJ").should("be.visible").contains("Without Team Project").click()    //clicking on the project
        cy.get(".ant-col-lg-5 > .ant-btn").should("be.visible").contains(clientName2)   //checking client name is visible or not
    })

    it("Assigning Existing Client to the Existing Project - Positive - PC7", () => {
        cy.visit("https://timegram-8ecdc.web.app/login")
        cy.wait(5000)
        cy.login()
        cy.wait(10000)
        cy.url().should("eq", "https://timegram-8ecdc.web.app/dashboard")
        cy.get("#Projects > .index_linkText__d9gMy > .index_textWhite__OiHF8").should("be.visible").click()
        cy.url().should("eq", "https://timegram-8ecdc.web.app/projects")
        cy.wait(2000)

        cy.get(".index_projectPageWrapper__soNsJ").should("be.visible").contains("With Team Project").click()
        cy.get(".ant-drawer-body").should("be.visible")
        cy.get(".ant-col-lg-5 > .ant-btn").should("be.visible").contains("Add Client").click()
        cy.get(".ant-modal-body").should("be.visible")
        cy.get(".AddClientModal_addClientHeading__3sGrX").should("be.visible").contains("Add Client")
        cy.xpath("/html/body/div[3]/div/div[2]/div/div[2]/div/div/div[2]/div/div/div/div/div/div/div[1]/div[1]/div/div[1]/div").should("be.visible").contains("Add New Client") //checking Add new client tab is visible or not
        cy.xpath("/html/body/div[3]/div/div[2]/div/div[2]/div/div/div[2]/div/div/div/div/div/div/div[1]/div[1]/div/div[2]/div").should("be.visible").contains("Add Existing Client").click()   //checking existing client tab is visible or not

        cy.get("#clientId").should("be.visible").click()
        //cy.get(".ant-select-dropdown").should("be.visible").should("have.text", "Client One", "Client Two")
        cy.get(".ant-select-dropdown").contains("Client Two").click()
        cy.get("#hourlyRate").should("be.visible").type("30")    //Adding hourly rate
        cy.get(":nth-child(3) > .ant-btn").should("be.visible").contains("Save").click()  //clicking on save button
        cy.wait(3000)
        cy.checkNotificationMessage("Project Updated")  //checking notification message
        cy.wait(3000)
        cy.get(".index_projectPageWrapper__soNsJ").should("be.visible").contains("With Team Project").click()   //clicking on the project
        cy.get(".ant-col-lg-5 > .ant-btn").should("be.visible").contains(clientName2)   //checking client name is visible or not
    })

    it("Editing Project Name - PC8", () => {
        cy.visit("https://timegram-8ecdc.web.app/login")
        cy.wait(5000)
        cy.login()
        cy.wait(10000)
        cy.url().should("eq", "https://timegram-8ecdc.web.app/dashboard")
        cy.get("#Projects > .index_linkText__d9gMy > .index_textWhite__OiHF8").should("be.visible").click()
        cy.url().should("eq", "https://timegram-8ecdc.web.app/projects")
        cy.wait(2000)

        cy.get(".index_projectPageWrapper__soNsJ").should("be.visible").contains("With Team Project").click()
        cy.get("#name").should("be.visible").clear().type("With Team Project - Edited")
        cy.get(".index_buttonWrapper__oNdjC > .ant-btn").should("be.visible").contains("Save").click()
        cy.wait(2000)
        cy.checkNotificationMessage("Project Updated")
        cy.get(".index_projectPageWrapper__soNsJ").should("be.visible").contains("With Team Project - Edited")
    })

    it("Creating Task from the Projects Page without filling the Required fields - Negative  - PC9", () => {
        cy.visit("https://timegram-8ecdc.web.app/login")
        cy.wait(5000)
        cy.login()
        cy.wait(10000)
        cy.url().should("eq", "https://timegram-8ecdc.web.app/dashboard")
        cy.get("#Projects > .index_linkText__d9gMy > .index_textWhite__OiHF8").should("be.visible").click()
        cy.url().should("eq", "https://timegram-8ecdc.web.app/projects")
        cy.wait(2000)

        cy.xpath("/html/body/div/div/section/section/main/div[8]/div[2]/div/div/div/div/div/div/div/table/tbody/tr[3]/td[1]/button").should("be.visible").click()   //clicking on the expand project button
        cy.get(".ant-table-cell-with-append > .ant-btn > span").should("be.visible").contains("New Task").click()   //clicking on add new task button
        cy.get(".anticon-check > svg").should("be.visible").click()  //clicking on tick
        cy.wait(2000)
        cy.checkNotificationMessage("Please enter task name")  //checking notification message
    })

    it("Creating Task from the Projects Page - Positive - PC10", () => {
        cy.visit("https://timegram-8ecdc.web.app/login")
        cy.wait(5000)
        cy.login()
        cy.wait(10000)
        cy.url().should("eq", "https://timegram-8ecdc.web.app/dashboard")
        cy.get("#Projects > .index_linkText__d9gMy > .index_textWhite__OiHF8").should("be.visible").click()
        cy.url().should("eq", "https://timegram-8ecdc.web.app/projects")
        cy.wait(2000)

        cy.xpath("/html/body/div/div/section/section/main/div[8]/div[2]/div/div/div/div/div/div/div/table/tbody/tr[3]/td[1]/button").should("be.visible").click()   //clicking on the expand project button
        cy.get(".ant-table-cell-with-append > .ant-btn > span").should("be.visible").contains("New Task").click()   //clicking on add new task button
        cy.get(".ant-input").should("be.visible").type("Task 1").should("have.value", "Task 1") //entering name of the task
        cy.get(".index_dateWrapper__q84MV > .undefined > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-picker > .ant-picker-input > #dueDate").should("be.visible").click() //clicking on due data field
        cy.get(".ant-picker-header-next-btn").should("be.visible").click()  //clicking on next month
        cy.get(".ant-picker-content").contains("30").click()    //selecting date
        cy.get(".ant-table-row-level-1 > :nth-child(6) > .index_memberColWrapper__jXXj- > :nth-child(2) > .anticon").should("be.visible").click()   //opening the pop over to select user on task
        cy.get(".ant-collapse-content-box > :nth-child(1) > :nth-child(1) > .ant-row").should("be.visible").click() //selecting the user
        cy.get(".ant-table-row-level-1 > :nth-child(6) > .index_memberColWrapper__jXXj- > :nth-child(2) > .anticon").should("be.visible").click()   //opening the pop over to select user on task
        cy.get(".anticon-check > svg").should("be.visible").click()  //clicking on tick
        cy.wait(2000)
        cy.checkNotificationMessage("Task added!")  //checking notification message
        cy.get(".index_projectPageWrapper__soNsJ").should("be.visible").contains("With Team Project - Edited").click()  //clicking on the project
        cy.get(".index_projectTitle__DDsOB").should("be.visible").contains("Task 1")  //checking task is added or not
    })

    it.skip("Deleting Project from the project page - PC4", () => {
        cy.visit("https://timegram-8ecdc.web.app/login")
        cy.wait(5000)
        cy.login()
        cy.wait(10000)
        cy.url().should("eq", "https://timegram-8ecdc.web.app/dashboard")
        cy.get("#Projects > .index_linkText__d9gMy > .index_textWhite__OiHF8").should("be.visible").click()
        cy.url().should("eq", "https://timegram-8ecdc.web.app/projects")

        cy.get('[data-row-key="xXO9l4hjusaPjElSqlXC"] > .index_actions__JC67o').click()
        cy.get(".ant-popover-inner-content").should("be.visible")
        cy.get(".ant-popover-message-title").should("be.visible").contains("Do you want to delete this project?")
        cy.get(".ant-btn-default").contains("No")
        cy.get(".ant-popover-buttons > .ant-btn-primary").should("be.visible").contains("Yes").click()
    })
})