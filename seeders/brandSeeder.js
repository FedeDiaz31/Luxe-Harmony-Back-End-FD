const { faker } = require("@faker-js/faker");
const Brand = require("../models/Brand");

faker.locale = "es";

let ArrayBrands = [
  {
    name: "Gibson",
    slug: "gibson",
    logo: "GIBSON-LOGO-WHITE-1.png",
    logo2: "GIBSON-LOGO-1.png",
    products: [],
  },
  {
    name: "Fender",
    slug: "fender",
    logo: "FENDER-LOGO-WHITE-1.png",
    logo2: "FENDER-LOGO-1.png",
    products: [],
  },
  {
    name: "PRS",
    slug: "prs",
    logo: "PRS-LOGO-WHITE-1.png",
    logo2: "PRS-LOGO-1.png",
    products: [],
  },
  {
    name: "Universal Audio",
    slug: "universal-audio",
    logo: "UA-LOGO-WHITE-1.png",
    logo2: "UA-LOGO-1.png",
    products: [],
  },
  {
    name: "Neumann",
    slug: "neumann",
    logo: "NEUMANN-LOGO-WHITE-1.png",
    logo2: "NEUMANN-LOGO-1.png",
    products: [],
  }
];

module.exports = async () => {
  const brands = [];

  for (let itemBrand of ArrayBrands) {
    const brand = new Brand({
      name: itemBrand.name,
      slug: itemBrand.slug,
      logo: itemBrand.logo,
      logo2: itemBrand.logo2,
      products: itemBrand.products,
    });
    brands.push(brand);
  }

  await Brand.insertMany(brands);

  console.log("[Database] Se corrió el seeder de Brands.");
};
