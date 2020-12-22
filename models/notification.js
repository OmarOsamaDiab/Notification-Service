const { Model } = require('objection')
const knex = require('../index')
Model.knex(knex)

class Notification extends Model {

    static get tableName() {
        return 'notification'
    }

}

module.exports = Notification
