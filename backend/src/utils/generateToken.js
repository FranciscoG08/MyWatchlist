import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const payload = { id: userId };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,       // ⚠️ não acessível pelo frontend
    secure: false,        // localhost não tem HTTPS
    sameSite: "lax",      // permite frontend em outra porta
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7 dias
  });

  return token;
};