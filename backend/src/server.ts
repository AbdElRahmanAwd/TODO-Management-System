import "dotenv/config";
import { app } from "./app";
import { AppDataSource } from "./config/data-source";

const port = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
