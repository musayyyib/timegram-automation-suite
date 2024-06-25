describe("Login Page all Tests", () => {

    beforeEach(() => {
        cy.handleUncaughtException(); //handling uncaught exception
        cy.viewport(1300, 660); //increasing the size of the page to get full view of the application
        cy.clearAllSessionStorage(); //clearing the session storage
        cy.clearAllLocalStorage();
        cy.clearIndexedDB();
    })

    const correctEmail = "zapierintegration@yopmail.com", nonExistingEmail = "musayyib@incorrect.com", wrongPassword = "incorrect", correctPassword = "Hexadecimal123#"

    it("Sign In - Positive Case - SI1 (Checking All fields and routing of the page)", () => {
        cy.visit("https://timegram-8ecdc.web.app/login")
        cy.wait(5000)

        cy.url().should("eq", "https://timegram-8ecdc.web.app/login")//checking the URL is correct or not

        cy.get(".index_timegramLogo__gXM6x > .ant-image > .ant-image-img").should("be.visible") //checking logo is visible or not
        cy.get(".index_headerContainer__gJHbW > :nth-child(2) > div").should("be.visible").contains("Don't have an account?")
        cy.get(".index_forgotPassword__zzxC4 > span").should("be.visible").contains("Forgot Password?")

        //checking all SSO options are visible or not        
        const ssoOptions = ["Sign In with Google", "Sign In with Microsoft", "Sign In with Apple"]
        ssoOptions.forEach((item, index) => {
            cy.get(`.index_otherTypes__6Y86H > :nth-child(${index + 1})`).contains(item)
        })

        cy.get("#email").should("be.visible").type(correctEmail).should("have.value", correctEmail)
        cy.get("#password").should("be.visible").type(correctPassword).should("have.value", correctPassword)
        cy.get(".ant-form > .ant-btn").should("be.visible").contains("Login")

        cy.get("#root > div > div:nth-child(1) > div > div:nth-child(2) > div > span").should("be.visible").contains("Sign up").click()
        cy.url().should("eq", "https://timegram-8ecdc.web.app/signup")
        cy.wait(1000)
    })

    it("Sign In - Positive Case - SI2 (Logging in)", () => {
        cy.visit("https://timegram-8ecdc.web.app/login")
        cy.wait(5000)

        cy.url().should("eq", "https://timegram-8ecdc.web.app/login")//checking the URL is correct or not

        cy.get("#email").should("be.visible").type(correctEmail).should("have.value", correctEmail)
        cy.get("#password").should("be.visible").type(correctPassword).should("have.value", correctPassword)
        cy.get(".ant-form > .ant-btn").should("be.visible").contains("Login").click()

        cy.wait(10000)
        cy.url().should("eq", "https://timegram-8ecdc.web.app/dashboard")
        cy.get(".index_dashboardHeaderRoot__grFKm").should("be.visible").contains("Dashboard")
    })

    it("Login Test - Negative -- Non existing email and password - SIC2", () => {
        cy.visit("https://timegram-8ecdc.web.app/login")
        cy.wait(5000)

        cy.get("#email").type(nonExistingEmail)
        cy.get("#password").type(wrongPassword)
        cy.get('button[type="submit"]').click()

        cy.get(".ant-message-custom-content > :nth-child(2)").should("have.text", "There is no user record corresponding to this identifier. The user may have been deleted.")
    })

    it("Login Test - Negative -- Existing email and wrong password - SIC3", () => {
        cy.visit("https://timegram-8ecdc.web.app/login")
        cy.wait(5000)

        cy.get("#email").type(correctEmail)
        cy.get("#password").type(wrongPassword)
        cy.get('button[type="submit"]').click()

        cy.get(".ant-message-custom-content > :nth-child(2)").should("have.text", "The password is invalid or the user does not have a password.")
    })
})

//testing