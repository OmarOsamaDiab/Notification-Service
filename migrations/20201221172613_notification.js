exports.up = function (knex) {
    return knex.schema
        .createTable("notification", (table) => {
            table.increments('id').primary()
            table.text("notification").nullable()
            table.timestamps(true, true)
        });
};

exports.down = function (knex) {
    return knex.schema.dropTable("notification")
};