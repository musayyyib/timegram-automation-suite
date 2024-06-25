describe("Get Started Page Test", () => {

    beforeEach(() => {
        cy.handleUncaughtException(); //handling uncaught exception
        cy.viewport(1300, 660); //increasing the size of the page to get full view of the application
    })

    it("Get Started Page -- Checking all fields - GS1", () => {
        cy.visit("https://timegram-8ecdc.web.app/get-started")
        cy.wait(5000)

        cy.get("#email").should("be.visible") //checking email field is visible or not
        cy.get(".ant-form > .ant-btn").should("be.visible").contains("Continue With Email") //checking get started button is visible or not
        cy.get(".index_headerContainer__gJHbW > :nth-child(2) > div").should("be.visible").contains("Already have an account? Sign in") //checing correct text is visible or not

        //checking all SSO options are visible or not        
        const ssoOptions = ["Sign Up with Google", "Sign Up with Microsoft", "Sign Up with Apple"]
        ssoOptions.forEach((item, index) => {
            cy.get(`.index_otherTypes__6Y86H > :nth-child(${index + 1})`).contains(item)
        })

        cy.get('[href="https://www.timegram.io/terms-of-service"]').should("be.visible").contains("Terms and Conditions") //checking terms and conditions link is visible or not
        cy.get('[href="https://www.timegram.io/privacy-policy"]').should("be.visible").contains("Privacy Policy") //checking privacy policy link is visible or not
    })

    it("Checking Input Fields in Get Started Page - GS2", () => {
        cy.visit("https://timegram-8ecdc.web.app/get-started")
        cy.wait(5000)

        cy.get("#email").should("be.visible")
        cy.get(".ant-form > .ant-btn").should("be.visible").click()
        cy.wait(2000)
        cy.get(".ant-form-item-explain-error").should("be.visible").contains("'email' is required")

        cy.get("#email").should("be.visible").type("randomxyz")
        cy.get(".ant-form > .ant-btn").should("be.visible").click()
        cy.wait(2000)
        cy.get(".ant-form-item-explain-error").should("be.visible").contains("Please enter valid email address")
    })

    const existingEmail = "khan1@yopmail.com"

    it("Checking Routing of the link from Get Started Page - Login Page - GS3", () => {

        cy.visit("https://timegram-8ecdc.web.app/get-started")
        cy.wait(5000)

        cy.get("#email").should("be.visible").type(existingEmail)
        cy.get(".ant-form > .ant-btn").should("be.visible").click()
        cy.wait(5000)
        cy.url().should("eq", "https://timegram-8ecdc.web.app/login")
    })

    const nonExistingEmail = "nonexistingemail1@yopmail.com"

    it("Checking Routing of the link from Get Started Page - Sign Up Page - GS4", () => {
        cy.visit("https://timegram-8ecdc.web.app/get-started")
        cy.wait(5000)

        cy.get("#email").should("be.visible").type(nonExistingEmail)
        cy.get(".ant-form > .ant-btn").should("be.visible").click()
        cy.wait(5000)
        cy.url().should("eq", "https://timegram-8ecdc.web.app/signup")
        cy.wait(2000)
        cy.get("#email").should("have.value", nonExistingEmail)
    })
})