exports.up = function (knex) {
  return knex.schema
    .createTable('save', (table) => {
      table.increments('id').primary();
      table.string('text_typed').notNullable().defaultTo(' ');
      table.bigint('character_count').notNullable().defaultTo(0);
      table.bigint('character_left').notNullable().defaultTo(0);
      table.int('upgrade_1').notNullable().defaultTo(0);
      table.int('upgrade_2').notNullable().defaultTo(0);
      table.int('upgrade_3').notNullable().defaultTo(0);
      table.bigint('add_per_input').notNullable().defaultTo(1);
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable('save');
};
