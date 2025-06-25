import express, { Request, Response } from "express";

export const borrowRoutes = express.Router();

borrowRoutes.get("/", (req: Request, res: Response) => {
  res.send("Borrow Summery");
});


