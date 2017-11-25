// *****************************************************************************
// Dependencies
// =============================================================

const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

require('./controllers/loginController')(passport);

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3001;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(passport.initialize());

// Serve up static assets
app.use(express.static("client/build"));

// Add routes, both API and view
const routes = require('./routes');
app.use(routes);

// Start the API server
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });
});

module.exports = app;
