import { app } from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./db/index.js";

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is up and running`);
    });
  })
  .catch((error) =>
    console.log("Error in connecting the server or db: ", error)
  )
