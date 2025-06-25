import express, { Application, Request, Response } from "express";

const app: Application = express();
app.use(express.json());

app.use("/", (req: Request, res: Response) => {
  res.send("Library Management API with Express, TypeScript & MongoDB");
});

export default app;
