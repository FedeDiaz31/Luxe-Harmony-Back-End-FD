const { Admin } = require("../models");
async function adminAuthenticated(req, res, next) {
  const admin = await Admin.findById(req.auth.adminId);
  if (admin) {
    return next();
  } else {
    res.json("Lo siento, no tienes credenciales de Administrador");
  }
}

module.exports = adminAuthenticated;
