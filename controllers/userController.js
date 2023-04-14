const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const slugify = require("slugify");

// Display a listing of the resource.
async function index(req, res) {
  const users = await User.find();
  res.json(users);
}

//// create token
async function createToken(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email }).populate({
      path: "orders",
      populate: "status",
    });
    const matchPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (matchPassword) {
      const token = jwt.sign({ userId: user._id }, process.env.SESSION_SECRET);
      res.json({
        user: {
          id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          phone: user.phone,
          address: user.address,
          orders: user.orders,
          token: token,
        },
      });
    } else res.json("No existe este usuario");
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "User login failed",
      error: err.message,
    });
  }
}

// Display the specified resource.
async function show(req, res) {
  const userId = req.params.id;
  const user = await User.findById(userId).populate({
    path: "orders",
    populate: "status",
  });
  res.json(user);
}

// Show the form for creating a new resource
// async function create(req, res) {
//   const bodyData = req.body;
//   console.log(bodyData)
//   try {
//     if (bodyData.googleId) {
//       console.log("entro");
//       const newUser = await User.create({
//         firstname: bodyData.givenName,
//         lastname: bodyData.familyName,
//         email: bodyData.email,
//       });
//       const token = jwt.sign({ userId: newUser.id }, process.env.SESSION_SECRET);
//       res.json({
//         user: {
//           id: newUser._id,
//           firstname: newUser.firstname,
//           lastname: newUser.lastname,
//           email: newUser.email,
//           addresses: newUser.addresses,
//           orders: newUser.orders,
//           token: token,
//         }
//       })
//     } else {
//       console.log("no entro");
//       const newUser = await User.create({
//         firstname: bodyData.firstname,
//         lastname: bodyData.lastname,
//         password: await bcrypt.hash(`${bodyData.password}`, 8),
//         email: bodyData.email,
//         addresses: bodyData.addresses,
//       });
//       res.json(newUser);
//     }
//   } catch {
//     console.log('error')
//   }
// }

async function create(req, res) {
  const bodyData = req.body;

  const newUser = await User.create({
    firstname: bodyData.firstname,
    lastname: bodyData.lastname,
    email: bodyData.email,
    phone: bodyData.phone,
    password: await bcrypt.hash(`${bodyData.password}`, 8),
    address: {
      country: bodyData.country,
      state: bodyData.state,
      city: bodyData.city,
      street: bodyData.street,
      reference: bodyData.reference,
    },
  });
  const token = jwt.sign({ userId: newUser.id }, process.env.SESSION_SECRET);

  res.json({
    user: {
      id: newUser._id,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      email: newUser.email,
      phone: newUser.phone,
      password: bodyData.password,
      address: newUser.address,
      orders: newUser.orders,
      token: token,
      createdAt: newUser.createdAt,
    },
  });
}

async function logInWithGoogle(req, res) {
  const { name, email, userId, password } = req.body;

  const user = await User.findOne({ email: email });
  if (user) {
    try {
      const user = await User.findOne({ email: email }).populate({
        path: "orders",
        populate: "status",
      });

      const token = jwt.sign({ userId: user._id }, process.env.SESSION_SECRET);
      return res.json({
        user: {
          id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          phone: user.phone,
          address: user.address,
          orders: user.orders,
          token: token,
        },
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "User login failed",
        error: err.message,
      });
    }
  } else {
    const newUser = await User.create({
      firstname: name,
      lastname: " ",
      email: email,
      password: await bcrypt.hash(`${userId}`, 8),
      address: {
        country: " ",
        state: " ",
        city: " ",
        street: " ",
        reference: " ",
      },
    });

    const token = jwt.sign({ userId: newUser.id }, process.env.SESSION_SECRET);

    return res.json({
      user: {
        id: newUser._id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
        phone: newUser.phone,
        address: newUser.address,
        orders: newUser.orders,
        token: token,
      },
    });
  }
}

// Show the form for editing the specified resource.
async function edit(req, res) {
  const bodyData = req.body;
  const userId = req.params.id;
  const user = await User.findByIdAndUpdate(
    { _id: userId },
    {
      firstname: bodyData.firstname,
      lastname: bodyData.lastname,
      email: bodyData.email,
      phone: bodyData.phone,
      address: {
        country: bodyData.country,
        state: bodyData.state,
        city: bodyData.city,
        street: bodyData.street,
        reference: bodyData.reference,
      },
    },
    { returnOriginal: false }
  );

  return res.json(user);
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  const userId = req.params.id;
  const user = await User.findByIdAndDelete(userId);

  res.json(user);
}

async function searchUser(req, res) {
  const userName = slugify(req.body.searchValue).toLowerCase();
  const users = await User.find();
  const searchUser = users.filter(
    (user) =>
      slugify(user.firstname).toLowerCase().includes(userName) === true ||
      slugify(user.lastname).toLowerCase().includes(userName) === true
  );

  res.json(searchUser);
}

module.exports = {
  index,
  show,
  create,
  edit,
  destroy,
  createToken,
  searchUser,
  logInWithGoogle,
};
