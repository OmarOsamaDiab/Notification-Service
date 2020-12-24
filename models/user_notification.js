const { Model } = require('objection')
const knex = require('../index')
Model.knex(knex)

class UserNotification extends Model {

    static get tableName() {
        return 'user_notification'
    }

}

const addUsersNotification = async ({ notification_id, ids, result }) => {
    try {
        const inserts = []
        for (const idx of result) {
            inserts.push(UserNotification.query().insert({ notification_id, user_id: ids[idx] }))
        }
        await Promise.all(inserts)
    } catch (e) {
        return e
    }
}

module.exports = { UserNotification, addUsersNotification }
