exports.up = function (knex) {
    return knex.schema
        .createTable("user_notification", (table) => {
            table.increments('id').primary()

            table.integer('notification_id').unsigned().notNullable();
            table.integer('user_id').unsigned().notNullable();

            table.foreign('user_id')
                .references('user.id')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
            table.foreign('notification_id')
                .references('notification.id')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
            table.timestamps(true, true)
        });
};

exports.down = function (knex) {
    return knex.schema.dropTable("user_notification")
};