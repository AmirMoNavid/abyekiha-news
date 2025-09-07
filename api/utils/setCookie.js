import jwt from "jsonwebtoken";
import ConfigPort from "../config/ConfigPort.js";

export const setCookie = (res, tokenName, secret, body, options = {}) => {
  const COOKIE_MAX_AGE_DAYS = 30;
  const daysInSeconds = COOKIE_MAX_AGE_DAYS * 24 * 60 * 60;
  const daysInMilliSeconds = daysInSeconds * 1000;

  const jwtToken = body
    ? jwt.sign(body, secret, { expiresIn: options.expiresIn ?? daysInSeconds })
    : "";

  res.cookie(tokenName, jwtToken, {
    maxAge: options.maxAge ?? daysInMilliSeconds,
    path: "/",

    httpOnly: false,
    secure: false,
  });
};
