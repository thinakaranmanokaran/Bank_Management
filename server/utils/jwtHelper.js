const jwt = require('jsonwebtoken');

const sendToken = (payload, statusCode, res, type = "user") => {

  let tokenPayload = {};

  // 👤 USER TOKEN
  if (type === "user") {
    tokenPayload = {
      id: payload._id,
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      dob: payload.dob,
      gender: payload.gender,
      role: payload.role,
      position: payload.position,
      img: payload.img,
      type: "user"
    };
  }

  // 🏦 ACCOUNT TOKEN
  else if (type === "account") {
    tokenPayload = {
      accountno: payload.accountno,
      email: payload.email,
      balance: payload.balance,
      type: "account"
    };
  }

  // 🤖 FACE TOKEN
  else if (type === "face") {
    tokenPayload = {
      email: payload.email,
      type: "face"
    };
  }

  // 🔐 GENERATE TOKEN
  const token = jwt.sign(
    tokenPayload,
    process.env.JWT_SECRET || "defaultSecretKey",
    { expiresIn: '30d' }
  );

  return res.status(statusCode).json({
    success: true,
    token,
    data: tokenPayload
  });
};

module.exports = sendToken;