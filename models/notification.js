const { Model } = require('objection')
const knex = require('../index')
Model.knex(knex)

class Notification extends Model {

    static get tableName() {
        return 'notification'
    }

}

const addNotification = async message => {
    try {
        const { id } = await Notification.query().insertAndFetch(message)
        return id
    } catch (e) {
        return e
    }
}

module.exports = { Notification, addNotification }
