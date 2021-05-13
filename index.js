require("dotenv").config();
var express = require("express");
var app = express();
var mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.listen(PORT, () => {
  console.log("Sever listening to request on port " + PORT);
});

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.4bt7p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  {
      useNewUrlParser: true,
      useUnifiedTopology: true
  }
);


/**
 * What if someone edits a block on the database? the block hash will change and the next what should be done to the current block, should it be removed or should we create a decentralized system for clients which in turn we would need to create user nodes.
 */
