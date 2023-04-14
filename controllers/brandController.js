const { default: slugify } = require("slugify");
const { Brand } = require("../models");
const { Product } = require("../models");
const formidable = require("formidable");
const fs = require("fs");
const { createClient } = require("@supabase/supabase-js");
const path = require("path");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
// Display a listing of users
async function index(req, res) {
  const brands = await Brand.find();
  res.json(brands);
}

// Display the specified resource.
async function show(req, res) {
  const brandSlug = req.params.slug;
  const brand = await Brand.findOne({ slug: brandSlug });
  const products = await Product.find().populate("brand");
  const productByBrand = products.filter(
    (product) => product.brand.slug === brand.slug
  );

  res.json(productByBrand);
}

// Post Brand
async function create(req, res) {
  const form = formidable({
    keepExtensions: true,
    multiples: true,
  });
  form.parse(req, async (err, fields, files) => {
    console.log(files);

    if (files.logo1 && files.logo2) {
      const ext = path.extname(files.logo1.filepath);
      const newFileNameLogo1 = `image_${Date.now()}${ext}`;
      const { data, error } = await supabase.storage
        .from("images")
        .upload(newFileNameLogo1, fs.createReadStream(files.logo1.filepath), {
          cacheControl: "3600",
          upsert: false,
          contentType: files.logo2.mimetype,
          duplex: "half",
        });

      const ext2 = path.extname(files.logo2.filepath);
      const newFileNameLogo2 = `image_${Date.now()}${ext2}`;
      const { data2, error2 } = await supabase.storage
        .from("images")
        .upload(newFileNameLogo2, fs.createReadStream(files.logo2.filepath), {
          cacheControl: "3600",
          upsert: false,
          contentType: files.logo2.mimetype,
          duplex: "half",
        });

      const createdBrand = await Brand.create({
        logo: newFileNameLogo1,
        logo2: newFileNameLogo2,
        name: fields.name,
        slug: slugify(fields.name, {
          replacement: "-",
          lower: true,
          locale: "en",
        }),
      });
      res.json(createdBrand);
    } else {
      const createdBrand = await Brand.create({
        name: "fields.name",
        slug: slugify("fields.name", {
          replacement: "-",
          lower: true,
          locale: "en",
        }),
      });
      res.json(createdBrand);
    }
  });
}

// Show the form for editing the specified resource.
async function edit(req, res) {
  const form = formidable({
    keepExtensions: true,
    multiples: true,
  });
  form.parse(req, async (err, fields, files) => {
    if (files.logo1 && files.logo2) {
      ///////Black-Logo////////
      const ext = path.extname(files.logo2.filepath);
      const newFileName1 = `image_${Date.now()}${ext}`;
      const { data, error } = await supabase.storage
        .from("images")
        .upload(newFileName1, fs.createReadStream(files.logo1.filepath), {
          cacheControl: "3600",
          upsert: false,
          contentType: files.logo2.mimetype,
          duplex: "half",
        });

      ///////White-Logo////////
      const ext2 = path.extname(files.logo2.filepath);
      const newFileName2 = `image_${Date.now()}${ext2}`;
      const { data2, error2 } = await supabase.storage
        .from("images")
        .upload(newFileName2, fs.createReadStream(files.logo2.filepath), {
          cacheControl: "3600",
          upsert: false,
          contentType: files.logo2.mimetype,
          duplex: "half",
        });

      const brand = await Brand.findByIdAndUpdate(
        { _id: req.params.id },

        {
          name: fields.name,
          slug: slugify(fields.name, {
            replacement: "-",
            lower: true,
            locale: "en",
          }),
          logo: newFileName1,
          logo2: newFileName2,
        },
        { returnOriginal: false }
      );
      return res.json(brand);
    }
    if (files.logo1 && files.logo2 != true) {
      ///////Black-Logo////////
      const ext = path.extname(files.logo1.filepath);
      const newFileName1 = `image_${Date.now()}${ext}`;
      const { data, error } = await supabase.storage
        .from("images")
        .upload(newFileName1, fs.createReadStream(files.logo1.filepath), {
          cacheControl: "3600",
          upsert: false,
          contentType: files.logo1.mimetype,
          duplex: "half",
        });

      const brand = await Brand.findByIdAndUpdate(
        { _id: req.params.id },

        {
          name: fields.name,
          slug: slugify(fields.name, {
            replacement: "-",
            lower: true,
            locale: "en",
          }),
          logo: newFileName1,
        },
        { returnOriginal: false }
      );
      return res.json(brand);
    }
    if (files.logo1 != true && files.logo2) {
      ///////White-Logo////////
      const ext2 = path.extname(files.logo2.filepath);
      const newFileName2 = `image_${Date.now()}${ext2}`;
      const { data2, error2 } = await supabase.storage
        .from("images")
        .upload(newFileName2, fs.createReadStream(files.logo2.filepath), {
          cacheControl: "3600",
          upsert: false,
          contentType: files.logo2.mimetype,
          duplex: "half",
        });

      const brand = await Brand.findByIdAndUpdate(
        { _id: req.params.id },

        {
          name: fields.name,
          slug: slugify(fields.name, {
            replacement: "-",
            lower: true,
            locale: "en",
          }),
          logo2: newFileName2,
        },
        { returnOriginal: false }
      );
      return res.json(brand);
    } else {
      const brand = await Brand.findByIdAndUpdate(
        { _id: req.params.id },

        {
          name: fields.name,
          slug: slugify(fields.name, {
            replacement: "-",
            lower: true,
            locale: "en",
          }),
        },
        { returnOriginal: false }
      );
      return res.json(brand);
    }
  });
  const brands = await Brand.find();
}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {
  const brandId = req.params.id;
  const deletedBrand = await Brand.findById(brandId);
  await Product.deleteMany({ brand: brandId });
  await Brand.findOneAndDelete({ _id: brandId });
  await res.json(deletedBrand);
}

async function searchBrand(req, res) {
  if (req.body.searchBrand) {
    const brandName = slugify(req.body.searchBrand).toLowerCase();
    const brands = await Brand.find();
    const searchBrands = brands.filter(
      (brand) => slugify(brand.slug).toLowerCase().includes(brandName) === true
    );
    res.json(searchBrands);
  } else {
    const searchBrands = await Brand.find();
    res.json(searchBrands);
  }
}

module.exports = {
  index,
  show,
  create,
  edit,
  update,
  destroy,
  searchBrand,
};
