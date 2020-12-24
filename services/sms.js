require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;


const sendSMS = async ({ phones, message }) => {
    try {
        const queue = []
        for (const phone of phones) {
            queue.push(_sendSms(phone, message))
        }
        await Promise.all(queue)
    } catch (e) {
        return e
    }
}

const _sendSms = async (phone, message) => {
    try {
        const client = require('twilio')(accountSid, authToken);
        const response = await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phone
        })
        return response.status === "sent"
    } catch (e) {
        return e
    }
}

module.exports = sendSMS;