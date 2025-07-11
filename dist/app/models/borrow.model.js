"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = void 0;
const mongoose_1 = require("mongoose");
const borrowSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Book",
        required: [true, "Book id is missing"],
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is missing"],
        min: [0, "Quantity must be at least 1"],
    },
    dueDate: { type: Date, required: [true, "Due date is not submitted"] },
}, {
    versionKey: false,
    timestamps: true,
});
exports.Borrow = (0, mongoose_1.model)("Borrow", borrowSchema);
