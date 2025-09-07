import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";
import ConfigPort from "./config/ConfigPort.js";
import db from "./config/Database.js";
import categoryRoutes from "./routes/categoryRoute.js";
import commentRoute from "./routes/commentRoute.js";
import slideShowRoutes from "./routes/slideShowRoute.js";
import userRoutes from "./routes/userRoute.js";
import articleRoutes from "./routes/articleRoute.js";
import uploadFileRoutes from "./routes/uploadFileRoute.js";
import pollRoutes from "./routes/pollRoute.js";
import faqsRoutes from "./routes/faqsRoute.js";
import advertisingRoutes from "./routes/advertisingRoute.js";
import villageRoutes from "./routes/villageRoute.js";
import tourismRoutes from "./routes/tourismRoute.js";
import videoRoutes from "./routes/videoRoute.js";
import logger from "morgan";
import { setCookie } from "./utils/setCookie.js";

const app = express();

try {
  await db.authenticate();
  console.log("database connected");
  //await db.sync({ alter: true });
} catch (error) {
  console.log(error);
}

// function setRefreshToken(req, res) {
//   let decodedJwt = { visitedPaths: ["/api/article"] };
//   setCookie(res, "refreshToken", process.env.REFRESH_TOKEN_SECRET, decodedJwt, {
//     expiresIn: 36000000 /* 10h */,
//     maxAge: 36000000,
//   });
// }

const { port, allowedDomains } = ConfigPort;

app.use(
  cors({
    credentials: true,
    origin: [allowedDomains, "http://localhost:3000"],
  })
);

// app.use((req, res, next) => {
//   setRefreshToken(req, res);
//   next();
// });

app.use(logger("dev"));
app.use(express.json());
app.use(fileUpload());
app.use(cookieParser());
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", uploadFileRoutes);
app.use("/api", articleRoutes);
app.use("/api", faqsRoutes);
app.use("/api", videoRoutes);
app.use("/api", slideShowRoutes);
app.use("/api", commentRoute);
app.use("/api", pollRoutes);
app.use("/api", advertisingRoutes);
app.use("/api", villageRoutes);
app.use("/api", tourismRoutes);
// app.get("/api", setRefreshToken);

app.listen(port, () => console.log(`server is running on port ${port}`));
