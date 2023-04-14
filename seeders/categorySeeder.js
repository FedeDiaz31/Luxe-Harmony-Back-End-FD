const { faker } = require("@faker-js/faker");
const { Category } = require("../models");
const { User } = require("../models");
const slugify = require("slugify");

faker.locale = "es";

let ArrayCategories = [{name:"Electric",slug:'electric'}, {name:"Acoustic",slug:'acoustic'}, {name:"Bass",slug:'bass'},{name: "AudioPro",slug:'audiopro'}];

const numbers = [1, 2, 3, 4];

module.exports = async () => {
  const categories = [];
  for (let i = 0; i < ArrayCategories.length; i++) {
    const category = new Category({
      name: ArrayCategories[i].name,
      number: numbers[i],
      products: [],
      slug: ArrayCategories[i].slug
    });
    categories.push(category);
  }

  await Category.insertMany(categories);

  console.log("[Database] Se corrió el seeder de Categories.");
};
