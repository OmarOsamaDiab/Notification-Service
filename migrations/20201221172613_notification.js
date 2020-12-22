exports.up = function (knex) {
    return knex.schema
        .createTable("notification", (table) => {
            table.increments('id').primary()
            table.string("title").nullable()
            table.text("body").nullable()
            table.timestamps(true, true)
        });
};

exports.down = function (knex) {
    return knex.schema.dropTable("notification")
};