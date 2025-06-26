import mongoose from "mongoose";
import { Server } from "http";
import app from "./app";

let server: Server;
require("dotenv").config();

const port: number = parseInt(process.env.PORT || "5010", 10);

async function main() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error(
        "MONGODB_URI is not defined in the environment variables."
      );
    }

    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB using ODM Mongoose");

    server = app.listen(port, () => {
      console.log("Server is running on port: ", port);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
