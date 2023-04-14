const { Category, Product } = require("../models");

// Display a listing of the resource.
async function index(req, res) {
  const category = await Category.find().populate("products");
  res.json(category);
}

// Display the specified resource.
async function show(req, res) {
  const categoryName = req.params.name;
  const category = await Category.findOne({ slug: categoryName }).populate({
    path: "products",
    populate: "brand",
  });
  res.json(category);
}

// Show the form for creating a new resource
async function create(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {}

module.exports = {
  index,
  show,
  create,
  store,
  edit,
  update,
  destroy,
};
