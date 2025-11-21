import app from "./app.js";
import dotenv from "dotenv";
import { connect } from "./db/config.db.js";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 3000;

connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`App listening on port http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error", error);
    process.exit(1);
  });
