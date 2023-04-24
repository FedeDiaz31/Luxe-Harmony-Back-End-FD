const { Order, Status, User, Product } = require("../models");

// Display a listing of the resource.
async function index(req, res) {
  const orders = await Order.find()
    .populate("user")
    .populate("status")
    .sort({ $natural: -1 });
  return res.json(orders);
}

async function lastOrders(req, res) {
  const orders = await Order.find()
    .sort({ $natural: -1 })
    .limit(10)
    .populate("user")
    .populate("status");
  res.json(orders);
}

// Display the specified resource.
async function show(req, res) {
  const orderId = req.params.id;
  const order = await Order.findById(orderId).populate("status");
  res.json(order);
}

// Show the form for creating a new resource
async function create(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {
  const status = await Status.findOne({ name: "Processing" });
  const user = await User.findById(req.auth.userId);
  const bodyData = req.body;

  let totalPrice = 0;
  for (let productData of bodyData.products) {
    const product = await Product.findById(productData.product._id);
    totalPrice += product.price * productData.quantity;
    if (product.stock >= productData.quantity) {
      product.stock = product.stock - productData.quantity;
      product.save();
    } else {
      res.json("No hay suficientes productos en stock.");
    }
  }
  const order = await Order.create({
    status: status,
    user: user,
    products: bodyData.products,
    totalPrice,
  });

  user.orders.push(order._id);
  user.save();
  res.json(order);
}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {
  const newStatus = await Status.findById(req.body.idStatus);
  await Order.findByIdAndUpdate(req.params.id, { status: newStatus });
  const order = await Order.findById(req.params.id)
    .populate("status")
    .populate("user");
  return res.json(order);
}

// Remove the specified resource from storage.
async function destroy(req, res) {}

module.exports = {
  index,
  lastOrders,
  show,
  create,
  store,
  edit,
  update,
  destroy,
};
