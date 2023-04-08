const express = require('express');
const app = express();
app.use(express.json());
const configRoutes = require('./routes');
const port = 5000;

async function main() {
    configRoutes(app);
    app.listen(port, async () => {
        console.log(`Your server is running on http://localhost:${port}`);
    })
}

main().catch(console.error)