import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;

  if (!token)
    return res
      .status(401)
      .json({ message: "No se encuentra un token por favor inicie sesión" });

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err)
      return res
        .status(403)
        .json({ message: "Token invalido, por favor intente nuevamente" });
    req.user = user;
    next();
  });
};
