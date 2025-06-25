import express, { Request, Response } from "express";
import { Book } from "../models/books.model";

export const booksRoutes = express.Router();

booksRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const newBook = await Book.create(body);
    res.json({
      success: true,
      message: "Book created successfully",
      data: newBook,
    });
  } catch (error: any) {
    res.json({
      message: "Validation failed",
      success: false,
      error: {
        name: error.name,
        errors: error,
      },
    });
  }
});

booksRoutes.get("/", async (req: Request, res: Response) => {
  const { filter, sortBy, sort, limit = 10 } = req.query;

  try {
    if (filter && sortBy && sort && limit) {
      const sortOrder = sort === "desc" ? -1 : 1;
      const books = await Book.find({ genre: filter.toString() })
        .sort({ [sortBy.toString()]: sortOrder })
        .limit(Number(limit));

      res.json({
        success: true,
        message: "Books retrieved successfully",
        data: books,
      });
    } else {
      const books = await Book.find();
      res.json({
        success: true,
        message: "Books retrieved successfully",
        data: books,
      });
    }
  } catch (error: any) {
    res.json({
      message: "Books retrieving failed",
      success: false,
      error: {
        name: error.name,
        errors: error.errors,
      },
    });
  }
});

// Get a book
booksRoutes.get("/:bookId", async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  try {
    const book = await Book.findById(bookId);
    if (!book) {
      res.json({
        success: false,
        message: "Book not found",
        data: null,
      });
    } else {
      res.json({
        success: true,
        message: "Books retrieved successfully",
        data: book,
      });
    }
  } catch (error: any) {
    res.json({
      message: "Books retrieving failed",
      success: false,
      error: {
        name: error.name,
        errors: error,
      },
    });
  }
});

// Update
booksRoutes.put("/:bookId", async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  const updatedBody = req.body;
  try {
    const book = await Book.findById(bookId);
    if (book) {
      const updatedBook = await Book.findByIdAndUpdate(bookId, updatedBody, {
        new: true,
      });
      res.json({
        success: true,
        message: "Book updated successfully",
        data: updatedBook,
      });
    } else {
      res.json({
        success: false,
        message: "Book not found and update unsuccessful",
        data: book,
      });
    }
  } catch (error: any) {
    res.json({
      message: "Books updating failed",
      success: false,
      error: {
        name: error.name,
        errors: error,
      },
    });
  }
});

booksRoutes.delete("/:bookId", async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  try {
    const book = await Book.findById(bookId);
    if (book) {
      await Book.findOneAndDelete({ _id: bookId });
      const book = await Book.findById(bookId);
      res.json({
        success: true,
        message: "Book deleted successfully",
        data: book,
      });
    } else {
      res.json({
        success: true,
        message: "Book not found and delete unsuccessful",
        data: book,
      });
    }
  } catch (error: any) {
    res.json({
      message: "Books deleting failed",
      success: false,
      error: {
        name: error.name,
        errors: error,
      },
    });
  }
});
