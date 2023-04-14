const { Bill } = require("../models");

// Display a listing of the resource.
async function index(req, res) {
  const bills = await Bill.find();
  res.json(bills);
}

async function lastBills(req, res) {
  const bills = await Bill.find().sort({ $natural: -1 }).limit(10);
  res.json(bills);
}

// Display the specified resource.
async function show(req, res) {
  const billId = req.params.id;
  const bill = await Bill.find({ user: req.params.id });
  res.json(bill);
}

// Show the form for creating a new resource
async function create(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {
  const bodyData = req.body;
  const bill = await Bill.create({
    user: req.auth.userId,
    firstname: bodyData.firstname,
    lastname: bodyData.lastname,
    email: bodyData.email,
    phoneNumber: bodyData.phoneNumber,
    products: bodyData.products,
    details: bodyData.details,
    totalPrice: bodyData.totalPrice,
    streetAddres: bodyData.streetAddres,
    reference: bodyData.reference,
    city: bodyData.city,
    country: bodyData.country,
    province: bodyData.province,
  });
  res.json(bill);
}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {}

module.exports = {
  index,
  lastBills,
  show,
  create,
  store,
  edit,
  update,
  destroy,
};
