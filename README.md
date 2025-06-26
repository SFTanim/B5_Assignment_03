# 📚 Library Management System API

This Library Management System provides a RESTful API to manage books and borrowing activities. You can create, view, update, delete, and borrow books, as well as retrieve a summary of borrowed records.

---

## 🛠️ Tech Stack

This RESTful API is built by using the following technologies:

- **[Express.js](https://expressjs.com/)** – Fast, unopinionated web framework for Node.js used to handle routing and HTTP requests.
- **[TypeScript](https://www.typescriptlang.org/)** – Superset of JavaScript providing static type checking and enhanced code clarity.
- **[MongoDB](https://www.mongodb.com/)** – NoSQL database used for flexible document storage.
- **[Mongoose](https://mongoosejs.com/)** – ODM (Object Data Modeling) library for MongoDB that simplifies data modeling and validation.

## 🚀 Live Demo

🔗 **Deployed URL**: [https://assignment03library.vercel.app](https://assignment03library.vercel.app)

You can access the hosted API using tools like Postman or directly in your browser (for `GET` routes).



## ⚙️ Setup Instructions

Follow these steps to run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/SFTanim/B5_Assignment_03.git
cd B5_Assignment_03
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env` File

Create a `.env` file in the root directory and add your MongoDB connection string:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/library
```

> ⚠️ Replace `<username>` and `<password>` with your actual MongoDB credentials and use explcitly `PORT` and `MONGODB_URI` name to declare.

### 4. Run the Server (in Dev Mode)

```bash
npm run dev
```


### 5. Access the API

Once running, the API will be accessible at:

```
http://localhost:5000/...
```

You can test endpoints like:

- `GET /books`
- `POST /books`
- `POST /borrow`
- etc.

---

✅ Make sure MongoDB is running and accessible from your environment.


## 🔧 Core Features

### 1. 📘 Create a Book

**Endpoint:** `POST /books`

Add a new book to the library.

**Request Example:**

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "FANTASY",
  "isbn": "978235023",
  "description": "An overview of cosmology and black holes.",
  "copies": 46,
  "available": true
}
```

---

### 2. 📖 Get All Books

**Endpoint:** `GET /books`

Supports filtering, sorting, and pagination.

**Query Parameters:**

- `filter` – Filter by genre (e.g. `FANTASY`, `SCIENCE`)
- `sortBy` – Field to sort by (e.g. `createdAt`)
- `sort` – `asc` or `desc`
- `limit` – Number of results to return (default: 10)

**Endpoint:** `/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5`

---

### 3. 🔍 Get Book by ID

**Endpoint:** `GET /books/:bookId`

Retrieve a specific book using its unique ID.

---

### 4. ✏️ Update a Book

**Endpoint:** `PUT /books/:bookId`

Update any book’s data (partial updates allowed).

**Request Example:**

```json
{
  "copies": 50
}
```

---

### 5. 🗑️ Delete a Book

**Endpoint:** `DELETE /books/:bookId`

Remove a book from the system.

---

### 6. 📦 Borrow a Book

**Endpoint:** `POST /borrow`

Borrow a book.

**Request Example:**

```json
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

---

### 7. 📊 Borrowed Books Summary

**Endpoint:** `GET /borrow`

Will returns an aggregated summary of total quantity borrowed for each book along with title and ISBN.

---

## ✅ API Summary Table

| Feature        | Endpoint         | Method | Description                           |
| -------------- | ---------------- | ------ | ------------------------------------- |
| Create Book    | `/books`     | POST   | Add a new book                        |
| Get All Books  | `/books`     | GET    | Retrieve all books                    |
| Get Book by ID | `/books/:id` | GET    | Fetch specific book details           |
| Update Book    | `/books/:id` | PUT    | Update existing book info             |
| Delete Book    | `/books/:id` | DELETE | Delete a book from the system         |
| Borrow a Book  | `/borrow`    | POST   | Borrow one or more copies of a book   |
| Borrow Summary | `/borrow`    | GET    | View total quantity borrowed per book |

---
