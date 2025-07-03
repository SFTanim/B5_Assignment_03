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
  const { filter, sortBy, sort = "asc", limit = "10" } = req.query;
  try {
    const resultLimit = Number(limit) || 10;

    const query: any = {};
    if (filter) {
      query.genre = filter;
    }

    let sortOptions = {};
    if (sortBy) {
      const sortOrder = sort === "desc" ? -1 : 1;
      sortOptions = { [sortBy.toString()]: sortOrder };
    }

    const books = await Book.find(query).sort(sortOptions).limit(resultLimit);

    res.json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
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
  try {
    const book = await Book.findById(bookId);
    const newCopies = parseInt(req.body.copies);
    if (newCopies > 0) {
      const newBook = new Book(book);
      await newBook.updateCopies(newCopies, "increase");
      const updatedBook = await newBook.updateAvailable(true);

      res.json({
        success: true,
        message: "Book updated successfully",
        data: updatedBook,
      });
    } else {
      res.json({
        success: false,
        message: "Please input a positive number",
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
