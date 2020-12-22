const { Model } = require('objection')
const knex = require('../index')
Model.knex(knex)

class User extends Model {

    static get tableName() {
        return 'user'
    }
    static get relationMappings() {
        return {
            notification: {
                relation: Model.ManyToManyRelation,
                modelClass: require('./notification'),
                join: {
                    from: 'user.id',
                    through: {
                        from: 'user_notification.user_id',
                        to: 'user_notification.notification_id'
                    },
                    to: 'notification.id',
                }
            },
        }
    }
}

module.exports = User
