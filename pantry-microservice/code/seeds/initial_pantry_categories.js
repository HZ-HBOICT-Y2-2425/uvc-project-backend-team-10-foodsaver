export const seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('pantry_categories').del();

  // Inserts seed entries
  await knex('pantry_categories').insert([
    { id: 1, category: 'Grains', cost_per_1kg: 2.5, co2_emissions_per_1kg: 1.2 },
    { id: 2, category: 'Vegetables', cost_per_1kg: 3.0, co2_emissions_per_1kg: 0.8 },
    { id: 3, category: 'Fruits', cost_per_1kg: 4.0, co2_emissions_per_1kg: 1.0 },
    { id: 4, category: 'Dairy', cost_per_1kg: 5.0, co2_emissions_per_1kg: 2.5 },
    { id: 5, category: 'Meat', cost_per_1kg: 10.0, co2_emissions_per_1kg: 5.0 },
    { id: 6, category: 'Seafood', cost_per_1kg: 12.0, co2_emissions_per_1kg: 4.5 },
    { id: 7, category: 'Beverages', cost_per_1kg: 1.5, co2_emissions_per_1kg: 0.5 },
    { id: 8, category: 'Snacks', cost_per_1kg: 8.0, co2_emissions_per_1kg: 2.0 },
    { id: 9, category: 'Bakery', cost_per_1kg: 6.0, co2_emissions_per_1kg: 1.8 },
    { id: 10, category: 'Frozen Foods', cost_per_1kg: 7.0, co2_emissions_per_1kg: 3.0 },
  ]);
};