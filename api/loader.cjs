const dotenv = require('dotenv');
const path = require('path');

async function loadApp() {
    dotenv.config({
        path: path.join(__dirname, './.env')
    });

    await import("./index.js");
}

loadApp();