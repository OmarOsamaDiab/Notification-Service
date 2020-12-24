require("dotenv").config()

const express = require('express')
const bodyParser = require("body-parser")
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json');

const notificationRouter = require("./routes/notification.routes")

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use('/notification', notificationRouter)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})