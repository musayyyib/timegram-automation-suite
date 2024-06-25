describe("Tracker Page All Test Cases", () => {

    beforeEach(() => {
        cy.handleUncaughtException(); //handling uncaught exception
        cy.viewport(1300, 660); //increasing the size of the page to get full view of the application
    })

    it("Tracker Page -- Checking all fields - TC1", () => {

        cy.visit("https://timegram-8ecdc.web.app/login")
        cy.login()
        cy.wait(10000)

        cy.url().should("eq", "https://timegram-8ecdc.web.app/dashboard")
        cy.get("#Tracker > .index_linkText__d9gMy > .index_textWhite__OiHF8").should("be.visible").click() //clicking on tracker icon
        cy.url().should("eq", "https://timegram-8ecdc.web.app/timetracker") //checking URL of the page
        cy.get(".index_dashboardHeaderRoot__grFKm").should("be.visible").contains("Tracker") //checking time tracker is visible or not
        //cy.get(".index_headerContentWrapper__9vrNq > div.undefined > .index_simpleParagraph__Z-\+Kl").should("be.visible") //checking text is visible or not
        cy.get(".ant-select-selector").should("be.visible").click() //checking select team drop down is visible or not
        cy.get('[style="padding-left: 0px; display: inline-flex;"] > .ant-btn').should("be.visible")//checking Manual time button is available or not
        cy.get('[style="padding-left: 0px; display: inline-flex;"] > .ant-btn > span').should("be.visible").contains("Manual Time") //checking Manual time is written correct or not
        cy.get(".index_buttonWrapper__aRzzp > .ant-btn").should("be.visible") //checking Add Highlight button is visible or not
        cy.get(".ant-btn > :nth-child(2)").should("be.visible").contains("Add Highlight") //checking Add Highlight is written correct or not

        cy.get('[aria-label="Project"] > .ant-table-column-sorters > .ant-table-column-title').should("be.visible").contains("Project")
        cy.get('[style="text-align: center;"]').should("be.visible").contains("Tags")
        cy.get('[aria-label="Status"] > .ant-table-column-sorters > .ant-table-column-title').should("be.visible").contains("Status")
        cy.get(".ant-table-thead > tr > :nth-child(4)").should("be.visible").contains("Teams")

        cy.logout()//logging out
    })

    it("Checking All available fields in Manual Time drawer - TC2", () => {
        cy.visit("https://timegram-8ecdc.web.app/login")
        cy.login()
        cy.wait(10000)

        cy.url().should("eq", "https://timegram-8ecdc.web.app/dashboard")
        cy.get("#Tracker > .index_linkText__d9gMy > .index_textWhite__OiHF8").should("be.visible").click() //clicking on tracker icon
        cy.url().should("eq", "https://timegram-8ecdc.web.app/timetracker") //checking URL of the page

        cy.get('[style="padding-left: 0px; display: inline-flex;"] > .ant-btn').should("be.visible").click() //clicking on Manual Time button
        cy.get(".ant-drawer-header").should("be.visible").contains("Time Request") //checking time request is visible or not

        //checking available option on the drawer
        const options = ["Pending", "Approved", "Rejected"]
        options.forEach((item, index) => {
            cy.get(`#rc-tabs-0-tab-${index + 1}`).contains(item)
        })

        cy.get(".TimeRequest_topButtonLeft__BAlBc > .ant-btn").should("be.visible").contains("Add Time") //checking Add Time button is visible or not
        cy.get(".TimeRequest_container__D45dw > .ant-row > .ant-col > :nth-child(1) > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-thead > tr > :nth-child(1)").should("be.visible").contains("Date") //checking Date is visible or not
        cy.get(".TimeRequest_cellTextEllipsis__saQJf").should("be.visible").contains("User Name") //checking User Name is visible or not
        cy.get(".TimeRequest_container__D45dw > .ant-row > .ant-col > :nth-child(1) > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-thead > tr > :nth-child(3)").should("be.visible").contains("Project") //checking Project is visible or not
        cy.get(".TimeRequest_container__D45dw > .ant-row > .ant-col > :nth-child(1) > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-thead > tr > :nth-child(4)").should("be.visible").contains("Task") //checking Tags is visible or not

        const headings = ["Description", "Requested Time", "Approver", "Status", "Action"]
        headings.forEach((item, index) => {
            const adjustedIndex = index + 4
            const adjustedIndex2 = adjustedIndex + 1
            cy.get(`.ant-table-thead > tr > :nth-child(${adjustedIndex2})`).should("be.visible").contains(item)
        })

        cy.get("#search").should("be.visible").type("Test").should("have.value", "Test") //checking search bar is visible or not
        cy.get(".ant-input-clear-icon").should("be.visible").click() //checking and clicking on the cross button

        cy.get(".index_closeIconWrapper__OesUG").should("be.visible").click() //closing drawer
        cy.wait(2000)
        cy.logout() //logging out
    })

    it("Creating Manual Time Request - TC3", () => {
        cy.visit("https://timegram-8ecdc.web.app/login")
        cy.login()
        cy.wait(10000)

        cy.url().should("eq", "https://timegram-8ecdc.web.app/dashboard")
        cy.get("#Tracker > .index_linkText__d9gMy > .index_textWhite__OiHF8").should("be.visible").click() //clicking on tracker icon
        cy.url().should("eq", "https://timegram-8ecdc.web.app/timetracker") //checking URL of the page

        cy.get('[style="padding-left: 0px; display: inline-flex;"] > .ant-btn').should("be.visible").click() //clicking on Manual Time button
        cy.get(".TimeRequest_topButtonLeft__BAlBc > .ant-btn").should("be.visible").contains("Add Time").click() //clicking on Add Time button
        cy.get(".ant-modal-body").should("be.visible")
        cy.get(".AddManualTimeModal_headingManualTimeModal__Vz-2H > div.undefined > .undefined").should("be.visible").contains("Add Manual Time") //checking modal heading
        cy.get(".AddManualTimeModal_headingManualTimeModal__Vz-2H > :nth-child(2)").should("be.visible").contains("Seamlessly add your time, take control of your productivity.") //checking modal description
        cy.get(".ant-col-lg-24 > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select").should("be.visible").click() //clicking on project drop down
        cy.get(".AddManualTimeModal_filedsWrapper__YnHmT > :nth-child(1) > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select").should("be.visible").click() //clicking on task drop down
        cy.get(":nth-child(2) > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-picker").should("be.visible").click() //clicking start time picker
        cy.get(":nth-child(3) > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-picker").should("be.visible").click() //clicking on end time picker
        cy.get("#description").should("be.visible").type("Test Description").should("have.value", "Test Description") //typing in description
        cy.get(":nth-child(2) > .ant-btn").should("be.visible").contains("Cancel") //checking cancel button
        cy.get(":nth-child(4) > .ant-col > div").should("be.visible").contains("Note: Any existing tracking data for the selected period will be overwritten")
        cy.get('[style="margin-left: -6px; margin-right: -6px; min-width: 100%; row-gap: 12px;"] > :nth-child(1) > .ant-btn').should("be.visible").contains("Save") //checking save button

        cy.get('[style="margin-left: -6px; margin-right: -6px; min-width: 100%; row-gap: 12px;"] > :nth-child(2) > .ant-btn > span').should("be.visible").contains("Cancel").click() //checking cancel button
        cy.get(".index_closeIconWrapper__OesUG").should("be.visible").click() //closing drawer
        cy.logout() //logging out
    })

    it.only("Checking All the fields in Add Highlight drawer - TC4", () => {
        cy.visit("https://timegram-8ecdc.web.app/login")
        cy.login()
        cy.wait(10000)

        cy.url().should("eq", "https://timegram-8ecdc.web.app/dashboard")
        cy.get("#Tracker > .index_linkText__d9gMy > .index_textWhite__OiHF8").should("be.visible").click() //clicking on tracker icon
        cy.url().should("eq", "https://timegram-8ecdc.web.app/timetracker") //checking URL of the page

        cy.wait(10000)

        cy.get(".index_buttonWrapper__aRzzp > .ant-btn").should("be.visible").contains("Add Highlights").click() //clicking on Add Highlight button
        cy.get(".ant-col-lg-20 > div.undefined > .undefined").should("be.visible").contains("Your Highlights of the Day") //checking Heading is visible or not
        cy.get(".ant-col-4 > .index_infoBoxWrapper__nFBDy > :nth-child(2) > .undefined").should("be.visible") // checking the value field of total unlogged is available or not
        cy.get(":nth-child(2) > .index_infoBoxWrapper__nFBDy > :nth-child(2) > .undefined").should("be.visible") // checking the value field of total selected is available or not
        cy.get(".ant-col-8 > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector").should("be.visible").contains("Select Task") //clicking on project drop down
        cy.get(".ant-col-8 > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector").click()
        cy.get(".ant-select-dropdown").should("be.visible") //checking the drop down is visible or not
        cy.get(":nth-child(5) > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector").should("be.visible").contains("Today") //checking the days picker is visible or not
        cy.get(":nth-child(5) > .ant-form-item > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector").click() //clicking on days picker

        const dropDownClass = ":nth-child(6) > :nth-child(1) > .ant-select-dropdown"

        cy.get(':nth-child(5) > :nth-child(1) > .ant-select-dropdown').should('be.visible')

        cy.get(dropDownClass).contains('Today')
        cy.get(dropDownClass).contains('Yesterday')
        cy.get(dropDownClass).contains('2 days ago')
        cy.get(dropDownClass).contains('3 days ago')
        cy.get(dropDownClass).contains('4 days ago')
        cy.get(dropDownClass).contains('5 days ago')

        cy.get(".index_closeIconWrapper__OesUG").should("be.visible").click() //closing drawer
        cy.logout() //logging out
    })
})