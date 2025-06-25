import mongoose from "mongoose";
import { Server } from "http";
import app from "./app";

let server: Server;

const port = 5010;
require("dotenv").config();

async function main() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9sxzsr9.mongodb.net/assignment003-librery?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("Connected to MongoDB using ODM Mongoose");

    server = app.listen(port, () => {
      console.log("Server is running on port: ", port);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
