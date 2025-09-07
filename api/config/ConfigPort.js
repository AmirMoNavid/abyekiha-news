import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

const ConfigPort = {
  port: process.env.PORT || 5000,
  allowedDomains: ["http://localhost:3000"],
  // process.env.NODE_ENV === 'production'
  //     ? process.env.REMOTE_SERVER_API
  //     : process.env.LOCAL_SERVER_API
};
export default ConfigPort;
