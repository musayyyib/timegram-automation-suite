describe("Dashboard Page Test", () => {

    beforeEach(() => {
        cy.handleUncaughtException(); //handling uncaught exception
        cy.viewport(1300, 660); //increasing the size of the page to get full view of the application
    })

    it("Dashboard Page -- Checking all fields - DC1", () => {
        cy.visit("https://timegram-8ecdc.web.app/login")
        cy.wait(5000)
        cy.login()
        cy.wait(10000)
        cy.url().should("eq", "https://timegram-8ecdc.web.app/dashboard")

        cy.get(".index_dashboardHeaderRoot__grFKm").should("be.visible").contains("Dashboard") //checking dashboard is visible or not
        cy.get(".index_rangePickerWrapper__VGXck").should("be.visible") //checking range picker is visible or not
        cy.get(".ant-select").should("be.visible") //checking select team drop down is visible or not
        cy.get(".index_dashboardSiderRoot__2Vlga").should("be.visible") //checking dashboard sider is visible or not
        cy.get(":nth-child(5) > :nth-child(1) > div.undefined > .undefined").contains("Team Activity") //checking team activity is visible or not
        cy.get("canvas").should("be.visible") //checking canvas is visible or not
        cy.get(':nth-child(2) > .index_nameTitle__ltPkc > :nth-child(1) > [style="cursor: pointer;"] > :nth-child(1) > .index_AvatarInfoWrapper__p1sNP > .index_nameBox__hbZH1 > [role="button"] > div.undefined > .undefined').should("be.visible").click()
        cy.wait(5000) //giving wait here  because drawer is loading all data in that time
        cy.get(".scrollbar-container").should("be.visible") //checking container is visible or not
        cy.get('.index_graphWrapper__VKBwX > :nth-child(2) > [style="height: inherit;"] > div > canvas').should("be.visible") //checking stack graphs are visible or not
        cy.get('.index_datePickerWrapper__MYTC2 > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .index_rangePickerWrapper__VGXck').should("be.visible").click() //checking range picker is visible or not
        cy.get(":nth-child(1) > .ant-picker-date-panel > .ant-picker-body > .ant-picker-content").should("be.visible") //checking date picker is visible or not 
        cy.get(".index_closeIconWrapper__OesUG").should("be.visible").click() //checking close icon is visible or not

        cy.logout()
    })


})