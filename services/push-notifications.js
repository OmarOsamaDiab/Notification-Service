require("dotenv").config()
const path = require("path")
const admin = require("firebase-admin")

const chunk = require("../helpers/chunk")

const pathToServiceAccount = path.resolve(process.env.FIREBASE_SERVICE_ACCOUNT_PATH || "")
const serviceAccount = require(pathToServiceAccount)


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DB_PATH
})

// this function is responsible for merging arrays together 
const merge = data => {
    let curChunk = 0
    const result = []
    for (const arr of data) {
        for (const item of arr) {
            result.push(item + curChunk)
        }
        curChunk += process.env.CHUNK_SIZE
    }
    return result
}

// message is an object contains { notification } notification => {title,body}
const sendNotification = async ({ message, registrationTokens }) => {
    try {
        // You can specify up to 100 device registration tokens (500 for Java and Node.js) per invocation
        const chunks = chunk(registrationTokens)
        const queue = []
        for (const tokens of chunks) {
            queue.push(_sendPushNotification({ notification: { body: message }, tokens }))
        }
        const result = await Promise.all(queue)
        const succeeded = merge(result)
        return succeeded
    } catch (e) {
        return e
    }
}


const _sendPushNotification = async message => {
    try {
        const response = await admin.messaging().sendMulticast(message)

        const succeededTokens = [];
        response.responses.forEach((resp, idx) => {
            if (resp.success) {
                succeededTokens.push(idx);
            }
        });
        return succeededTokens
    }
    catch (e) {
        return e
    }
}

module.exports = sendNotification