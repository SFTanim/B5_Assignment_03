"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const books_model_1 = require("../models/books.model");
exports.booksRoutes = express_1.default.Router();
exports.booksRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newBook = yield books_model_1.Book.create(body);
        res.json({
            success: true,
            message: "Book created successfully",
            data: newBook,
        });
    }
    catch (error) {
        res.json({
            message: "Validation failed",
            success: false,
            error: {
                name: error.name,
                errors: error,
            },
        });
    }
}));
exports.booksRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filter, sortBy, sort, limit = 10 } = req.query;
    try {
        if (filter && sortBy && sort && limit) {
            const sortOrder = sort === "desc" ? -1 : 1;
            const books = yield books_model_1.Book.find({ genre: filter.toString() })
                .sort({ [sortBy.toString()]: sortOrder })
                .limit(Number(limit));
            res.json({
                success: true,
                message: "Books retrieved successfully",
                data: books,
            });
        }
        else {
            const books = yield books_model_1.Book.find();
            res.json({
                success: true,
                message: "Books retrieved successfully",
                data: books,
            });
        }
    }
    catch (error) {
        res.json({
            message: "Books retrieving failed",
            success: false,
            error: {
                name: error.name,
                errors: error.errors,
            },
        });
    }
}));
// Get a book
exports.booksRoutes.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    try {
        const book = yield books_model_1.Book.findById(bookId);
        if (!book) {
            res.json({
                success: false,
                message: "Book not found",
                data: null,
            });
        }
        else {
            res.json({
                success: true,
                message: "Books retrieved successfully",
                data: book,
            });
        }
    }
    catch (error) {
        res.json({
            message: "Books retrieving failed",
            success: false,
            error: {
                name: error.name,
                errors: error,
            },
        });
    }
}));
// Update
exports.booksRoutes.put("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    try {
        const book = yield books_model_1.Book.findById(bookId);
        const newCopies = parseInt(req.body.copies);
        if (newCopies > 0) {
            const newBook = new books_model_1.Book(book);
            yield newBook.updateCopies(newCopies, "increase");
            const updatedBook = yield newBook.updateAvailable(true);
            res.json({
                success: true,
                message: "Book updated successfully",
                data: updatedBook,
            });
        }
        else {
            res.json({
                success: false,
                message: "Please input a positive number",
                data: book,
            });
        }
    }
    catch (error) {
        res.json({
            message: "Books updating failed",
            success: false,
            error: {
                name: error.name,
                errors: error,
            },
        });
    }
}));
exports.booksRoutes.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    try {
        const book = yield books_model_1.Book.findById(bookId);
        if (book) {
            yield books_model_1.Book.findOneAndDelete({ _id: bookId });
            const book = yield books_model_1.Book.findById(bookId);
            res.json({
                success: true,
                message: "Book deleted successfully",
                data: book,
            });
        }
        else {
            res.json({
                success: true,
                message: "Book not found and delete unsuccessful",
                data: book,
            });
        }
    }
    catch (error) {
        res.json({
            message: "Books deleting failed",
            success: false,
            error: {
                name: error.name,
                errors: error,
            },
        });
    }
}));
