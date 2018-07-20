// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Reservations (DATA)
// =============================================================
var reservations = [
  {
    name: "Ron",
    phone: 2125551212,
    email: "ron@no.com",
    uniqueid: "Ron1234"
  }
];

// Waitlist (DATA)
// =============================================================
var waitlist = [
  {
    name: "Mark",
    phone: 2125551212,
    email: "mark@no.com",
    uniqueid: "mark1234"
  }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});
// Make a reservation
app.get("/add", function (req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});
// View the reservations
app.get("/view", function (req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

// Displays all reservation objects
app.get("/api/view", function (req, res) {
  return res.json(reservations);
});

// Displays all waitlist
app.get("/api/wait", function (req, res) {
  return res.json(waitlist);
});

// Create New reservation
app.post("/api/add", function (req, res) {

  var reservation = req.body;

  console.log(reservation);

  if (reservations.length > 4) {
    waitlist.push(reservation);
  }
  else {
    reservations.push(reservation);
  }

  res.json(reservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});

