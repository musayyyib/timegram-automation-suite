describe("Login Page all Tests", () => {

    beforeEach(() => {
        cy.handleUncaughtException(); //handling uncaught exception
        cy.viewport(1300, 660); //increasing the size of the page to get full view of the application
        cy.clearAllSessionStorage(); //clearing the session storage
        cy.clearAllLocalStorage();
        cy.clearIndexedDB();
    })

    const correctEmail = "newuser7@yopmail.com", correctPass = "Hexadecimal123#", correctUserName = "User Name", correctCompanyName = "Company Name",
        invalidEmail = "randomxyz", incorrectPass = "wrong", incorrectUserName = "User Name 1"

    it.only("Sign Up - Positive Case - SU1", () => {
        cy.visit("https://timegram-8ecdc.web.app/signup")
        cy.wait(5000)

        cy.url().should("eq", "https://timegram-8ecdc.web.app/signup")
        cy.get(".index_timegramLogo__gXM6x > .ant-image > .ant-image-img").should("be.visible") //checking logo is visible or not
        cy.get(".index_textLine__iCZXJ").should("be.visible").contains("No strings attached and no credit card required")
        cy.get(".index_headerContainer__gJHbW > :nth-child(2) > div").should("be.visible").contains("Already have an account? Sign in")

        cy.get("#email").should("be.visible").type(correctEmail)
        cy.get("#fullName").should("be.visible").type(correctUserName)
        cy.get("#password").should("be.visible").type(correctPass)
        cy.get("#companyName").should("be.visible").type(correctCompanyName)
        cy.get(".ant-btn").should("be.visible").click()
        cy.wait(5000)

        cy.url().should("eq", "https://timegram-8ecdc.web.app/company-onboarding")
        cy.get(".index_selectedPlan__97CMG").should("be.visible").contains("Tracking")
        cy.get(".index_planCard__Ud8gw > :nth-child(2)").should("be.visible").contains("Planning Pro").click()
        cy.get(".ant-btn").should("be.visible").contains("Get Started").click()
        cy.wait(30000) //waiting for the dummy data, user and org creation

        cy.url().should("eq", "https://timegram-8ecdc.web.app/onboarding-loading")//dummy data message loading screen
        cy.wait(30000)
        cy.url().should("eq", "https://timegram-8ecdc.web.app/dashboard")
        cy.get(".ant-modal-body").should("be.visible").contains("Important")
    })

    it("Sign Up - Negative Case (Wrong Email) - SU2", () => {
        cy.visit("https://timegram-8ecdc.web.app/signup")
        cy.wait(5000)

        cy.get("#email").should("be.visible").type(invalidEmail)
        cy.get("#fullName").should("be.visible").type(correctUserName)
        cy.get("#password").should("be.visible").type(correctPass)
        cy.get("#companyName").should("be.visible").type(correctCompanyName)
        cy.get(".ant-btn").should("be.visible").click()
        cy.wait(2000)

        cy.get("#email_help > .ant-form-item-explain-error").should("be.visible").contains("Please enter valid email address")

    })

    it("Sign Up - Negative Case (Wrong Pass) - SU3", () => {
        cy.visit("https://timegram-8ecdc.web.app/signup")
        cy.wait(5000)

        cy.get("#email").should("be.visible").type(correctEmail)
        cy.get("#fullName").should("be.visible").type(correctUserName)
        cy.get("#password").should("be.visible").type(incorrectPass)
        cy.get("#companyName").should("be.visible").type(correctCompanyName)
        cy.get(".ant-btn").should("be.visible").click()
        cy.get(".ant-form-item-explain-error").should("be.visible").contains("Min. 8 characters (Uppercase, Lowercase, and Number)")
    })

    it("Sign Up - Negative Case (Wrong User Name) - SU4", () => {
        cy.visit("https://timegram-8ecdc.web.app/signup")
        cy.wait(5000)

        cy.get("#email").should("be.visible").type(correctEmail)
        cy.get("#fullName").should("be.visible").type(incorrectUserName)
        cy.get("#password").should("be.visible").type(correctPass)
        cy.get("#companyName").should("be.visible").type(correctCompanyName)
        cy.get(".ant-btn").should("be.visible").click()
        cy.get("#fullName_help > .ant-form-item-explain-error").should("be.visible").contains("Please enter valid name")
    })

    it("Sign Up - Negative Case (Leaving All Fields Empty) - SU5", () => {
        cy.visit("https://timegram-8ecdc.web.app/signup")
        cy.wait(5000)

        cy.get("#email").should("be.visible")
        cy.get("#fullName").should("be.visible")
        cy.get("#password").should("be.visible")
        cy.get("#companyName").should("be.visible")
        cy.get(".ant-btn").should("be.visible").click()

        cy.get("#email_help > .ant-form-item-explain-error").should("be.visible").contains("'email' is required")
        cy.get("#fullName_help > .ant-form-item-explain-error").should("be.visible").contains("Psst! You forgot to fill this.")
        cy.get("#password_help > .ant-form-item-explain-error").should("be.visible").contains("Min. 8 characters (Uppercase, Lowercase, and Number)")
        cy.get("#companyName_help > .ant-form-item-explain-error").should("be.visible").contains("Please enter Company Name")
    })
})