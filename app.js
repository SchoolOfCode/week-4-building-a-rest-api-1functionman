import express from "express";
const app = express();
const PORT = 3000;

import {
  getQuotes,
  getQuoteByID,
  addQuote,
  editQuote,
  deleteQuote,
} from "./quote.js";

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Welcome to the inspirational quotes API");
});

//Ticket 3 - All Quotes
app.get("/quotes", async (req, res) => {
  try {
    const quotes = await getQuotes();
    res.send(quotes); //Sending appropriate response
    res.status(200); //Sending OK status alongside response
  } catch (error) {
    console.error(error); //Log error for debugging
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Ticket 4 - Particular quote by ID
app.get("/quotes/:id", async (req, res) => {
  try {
    let test = req.params.id;
    const getQuotesById = await getQuoteByID(test);
    res.send(getQuotesById);
    res.status(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Ticket 5 - POST route handler
app.post("/quotes", (req, res) => {
  try {
    let newQuoteText = req.body.quoteText;
    let newAuthor = req.body.author;
    const newQuote = addQuote(newQuoteText, newAuthor);

    res.send(newQuote);
    res.status(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Ticket 6 - PATCH route handler
app.patch("/quotes/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let editQuoteText = req.body.quoteText;
    let editAuthor = req.body.author;

    const edit = editQuote(id, editQuoteText, editAuthor);

    res.send(edit);
    res.status(200);
    //Basically combining tickets 4 and 5. Finding the element we'd like to update by its ID. Rather than creating a new element, we are overwriting its content based on the request.body
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Ticket 7 - DELETE route handler
app.delete("/quotes/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const removeQuote = deleteQuote(id);

    res.send(removeQuote);
    //This just straight up removes the element with a matching ID from the quotes.json folder.
    res.status(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(PORT, function () {
  console.log(`Server is now listening on http://localhost:${PORT}`);
});
