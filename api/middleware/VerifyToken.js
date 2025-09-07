import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.status(401).json("شما ابتدا باید وارد حساب کاربری خود شوید");

  try {
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.json("توکن منقضی شده است");
      req.userId = decoded.userId;
      next();
    });
  } catch (err) {
    console.log("Invalid Token: ", token);
  }
};
