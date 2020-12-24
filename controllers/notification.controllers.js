
const validateBody = require('../valdiation')
const { getUsersDetails } = require('../models/user')
const { addNotification } = require('../models/notification')
const { addUsersNotification } = require('../models/user_notification')
const sendNotification = require("../services/push-notifications")
const sendSMS = require("../services/sms")


exports.send = async (req, res, next) => {
    try {
        const { error } = validateBody(req.body)
        if (error) return res.status(400).json({ error: error.details[0].message })


        let { notificationType } = req.query
        notificationType = notificationType ? notificationType.trim().toLowerCase() : undefined

        const types = ["sms", "app"]
        if (notificationType && !types.includes(notificationType)) {
            return res.status(400).json({ error: "this notificationType is not defined" })
        }


        const { userIds, message } = req.body
        const users = await getUsersDetails(userIds)
        if (users && !users.length) return res.status(404).json({ error: "ids not found" })

        const registrationTokens = users.map(user => user.notification_token)
        const phones = users.map(user => user.phone)
        const ids = user.map(user => user.id)

        // TODO: can be enhanced using promise all
        let result
        if (!notificationType) {
            await sendSMS({ phones, message })
            result = await sendNotification({ registrationTokens, message })
        } else if (notificationType === "sms") {
            await sendSMS({ phones, message })
        } else {
            result = await sendNotification({ registrationTokens, message })
        }

        //I will keep track of app notification only it may be requested later to be displayed on the app
        if (result.length) {
            const notification_id = await addNotification(message)
            await addUsersNotification({ notification_id, result, ids })
        }

        res.status(201).json({ error: null })

    } catch (e) {
        return res.status(500).send()
    }
}