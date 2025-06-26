import { Model, model, Schema } from "mongoose";
import { BookInstanceMethods, IBook } from "../interfaces/book.interfaces";

const booksSchema = new Schema<IBook, Model<IBook>, BookInstanceMethods>(
  {
    title: { type: String, required: [true, "Title is missing"] },
    author: { type: String, required: [true, "Author name is missing"] },
    genre: {
      type: String,
      enum: {
        values: [
          "FICTION",
          "NON_FICTION",
          "SCIENCE",
          "HISTORY",
          "BIOGRAPHY",
          "FANTASY",
        ],
        message: "Please select correct genre",
      },
      required: true,
    },
    isbn: {
      type: String,
      required: [true, "ISBN number is missing"],
      unique: [true, "Must be an unique number."],
    },
    description: { type: String },
    copies: {
      type: Number,
      required: [true, "Total copies is missing"],
      min: [0, "Copies must be a positive number"],
    },
    available: { type: Boolean, default: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Methods
booksSchema.method("updateAvailable", function updateAvailable(newAvailable) {
  this.available = newAvailable;
  return this.save();
});

booksSchema.method("updateCopies", function updateCopies(quantity) {
  this.copies = this.copies - quantity;
  return this.save();
});

export const Book = model<IBook>("Book", booksSchema);
