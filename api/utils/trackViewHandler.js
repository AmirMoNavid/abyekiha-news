import jwt from "jsonwebtoken";
import { env } from "process";
import { setCookie } from "./setCookie.js";
import FAQ from "../models/faqsModel.js";
export const trackViewHandler = async (req, res, dbModel) => {
  const { cookies, params } = req;
  let decodedJwt = null;

  if (isNaN(params?.id)) {
    return res.status(400).send({
      title: `bad id param. expected number recieved ${typeof params.id}`,
    });
  }

  try {
    decodedJwt = jwt.decode(cookies.trackingId, env.TRACK_ID_TOKEN_SECRET);
  } catch (err) {
  } finally {
    if (!decodedJwt) decodedJwt = {};

    if (!Array.isArray(decodedJwt?.visitedPaths)) decodedJwt.visitedPaths = [];

    if (!decodedJwt.visitedPaths.every((v) => v !== req.path)) return;

    decodedJwt.visitedPaths.push(req.path);

    delete decodedJwt.exp;

    console.log(decodedJwt);
    setCookie(res, "trackingId", env.TRACK_ID_TOKEN_SECRET, decodedJwt, {
      expiresIn: 36000 /* 10h */,
      maxAge: 36000,
    });

    const condition = { id: Number(params.id) };

    try {
      let { dataValues } = await dbModel.findOne({
        where: condition,
        attributes: [dbModel == FAQ ? "viewCount" : "numViews"],
      });

      if (!dataValues) {
        console.error("No data found for the given condition.");
        return;
      }

      if (dbModel !== FAQ) {
        let numViews = dataValues?.numViews ?? 0;
        numViews++;

        await dbModel.update({ numViews }, { where: condition });
      } else {
        let viewCount = dataValues?.viewCount ?? 0;
        viewCount++;

        await dbModel.update({ viewCount }, { where: condition });
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }

    res.sendStatus(200);
  }
};
