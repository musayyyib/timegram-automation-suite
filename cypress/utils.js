const { faker } = require('@faker-js/faker');

function generateUniqueEmail() {
    const timestamp = Date.now();
    const randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    const uniqueEmail = `test${timestamp}${randomNumber}@yopmail.com`;
    return uniqueEmail;
}

function generateUniqueName() {
    const uniqueFirstName = faker.name.firstName();
    const uniqueLastName = faker.name.lastName();
    const uniqueFullName = `${uniqueFirstName} ${uniqueLastName}`;
    return { uniqueFirstName, uniqueLastName, uniqueFullName };
}

function staggingURL() {
    return "https://timegram-8ecdc.web.app/";
}

function productionURL() {
    return "https://app.timegram.io/";

}

function getAppUrl() {
    if (process.env.NODE_ENV === 'development') {
        return staggingURL()
    }
    return productionURL()
}

module.exports = {
    generateUniqueEmail,
    generateUniqueName,
    staggingURL,
    productionURL,
    getAppUrl
};