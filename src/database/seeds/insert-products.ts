import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("products").del();

    // Inserts seed entries
    await knex("products").insert([
        { name: "Fish and chips", price: "20.99"},
        { name: "Cheeseburger", price: "13"},
        { name: "Parmegginana", price: "22.50"},
        { name: "Ceaser Salad", price: "15"},
        { name: "Bolognese pasta", price: "22.50"},
        { name: "Rice and beans", price: "12"},
        { name: "Chips", price: "8.30"},
        { name: "Chicken soup", price: "16"},
        { name: "Soft drink 350ml", price: "3.99"},
        { name: "Orange juice", price: "7.5"},
    ]);
};
