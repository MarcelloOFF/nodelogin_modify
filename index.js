// import bibliotek
const express = require('express');
const session = require('express-session');
const path = require('path');
const config = require('config');
const mongoose = require("mongoose");

// nawiazuje polaczenie z baza MongoDB
const database = config.get('mongo.connectionString');
mongoose
  .set('strictQuery', true)
  .connect(database, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("done connecting"))
  .catch((err) => console.log(err));

// ustawienia servera express 
const app = express();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'static')));

// wlacz body parsing
app.use(express.urlencoded({ extended: true }));
app.use(session({
	secret: config.get('session.secret'),
	resave: config.get('session.resave'),
	saveUninitialized: config.get('session.saveUninitialized')
}));
app.use(express.json());

// ustawia sciezki API
app.use("/", require("./routes/login"));

// ustawia port i startuje web server
const PORT = config.get('server.port') || 3000;
app.listen(PORT, console.log("Server has started at port " + PORT));