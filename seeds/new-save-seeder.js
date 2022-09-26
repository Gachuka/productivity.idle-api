const newSave = [
	{
		id: 1,
		text_typed: " ",
		character_count: 0,
		character_left: 0,
		upgrade_1: 0,
		upgrade_2: 0,
		upgrade_3: 0,
		add_per_input: 1
	}
];

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('save').del();
  await knex('save').insert(newSave);
};
