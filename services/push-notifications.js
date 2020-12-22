const path = require("path")


const admin = require("firebase-admin")

const pathToServiceAccount = path.resolve(process.env.FIREBASE_SERVICE_ACCOUNT_PATH || "")
const serviceAccount = require(pathToServiceAccount)
require("dotenv").config()


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DB_PATH
})

// You can specify up to 100 device registration tokens (500 for Java and Node.js) per invocation
const chunk = tokens => {
    const _chunkSize = 450
    const chunks = []
    for (let i = 0; i < tokens.length; i += _chunkSize) {
        chunks.push(tokens.slice(i, i + _chunksize))
    }
    return chunks
}

// message is an object contains { notification } notification => {title,body}
const send_notification = async (message, registrationTokens) => {
    try {
        const chunks = chunk(registrationTokens)
        const promises = []
        for (const tokens of chunks) {
            promises.push(_sendPushNotification({ ...message, tokens }))
        }
        await Promise.all(promises)
    } catch (e) {
        return e
    }
}


const _sendPushNotification = async message => {
    try {
        const response = await admin.messaging().sendMulticast(message)
        if (response.failureCount > 0) {
            const failedTokens = [];
            response.responses.forEach((resp, idx) => {
                if (!resp.success) {
                    failedTokens.push(message.tokens[idx]);
                }
            });
            console.log('List of tokens that caused failures: ' + failedTokens);
        }
    } catch (e) {
        return e
    }
}

module.exports = send_notification