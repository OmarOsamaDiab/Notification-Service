exports.up = function (knex) {
    return knex.schema
        .createTable("user", (table) => {
            table.increments('id').primary()
            table.string('notification_token').notNullable()
            table.string('phone').notNullable().unique()
            table.timestamps(true, true)
        });
};

exports.down = function (knex) {
    return knex.schema.dropTable("user")
};