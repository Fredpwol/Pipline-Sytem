require("dotenv").config();
var express = require("express");
var app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");
var mongoose = require("mongoose");
const User = require("./user/User");
const userRoute = require("./user");
const blockRoute = require("./block");
const { longestValidChain } = require("./utils");

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors())
app.use("/users", userRoute);
app.use("/blocks", blockRoute);

const GENESIS_BLOCK = {
  previousBlockHash: "omega",
  PH: 0.0,
  temperature: 0.0,
  flowRate: 0.0,
  signature: "",
  density: 0.0,
  broadcaster:"NULL",
  timestamp: Date.now(),
};

app.listen(PORT, () => {
  console.log("Sever listening to request on port " + PORT);
});


app.post("/register", async (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const { organization, password, email } = req.body;
  var broadcaster =
    Object(req.body).hasOwnProperty("broadcaster") && req.body.broadcaster;
  const hashedPassword = bcrypt.hashSync(password, salt);
  const unParsedUser = new User({ organization, password:hashedPassword, email });
  const userExists = await User.find({ email });
  if (userExists.length > 0) {
    return res
      .status(400)
      .json({ status: "error", message: "Email already taken." });
  }
  //TODO: if is broadcaster set isVerified to false and only verified broadcasters can broadcast blocks, we manually verify broadcaster on the server.
  //      generate public private keys for broadcasters and send it back to them
  //Install bcrypt and JWT
  try {
    if (Boolean(broadcaster)) {
      unParsedUser.isBroadCaster = true;
      unParsedUser.isVerified = false;
      const { publicKey, privateKey } = User.generateBroadCasterKeys();
      unParsedUser.publicKey = publicKey;
      unParsedUser.privateKey = privateKey;
      const parsedUser = await unParsedUser.save();
      const token = jwt.sign({ _id: parsedUser._id }, process.env.SECRET);
      return res.status(201).json({ publicKey, privateKey, token });
    } else {
      const parsedUser = await unParsedUser.save();
      const token = jwt.sign({ _id: parsedUser._id }, process.env.SECRET);
      const users = await User.find({isBroadCaster:false});
      if (!((users.length - 1) === 0)) {
        // assigns the longest valid chain to the user or a chain with the gensis block if no user is found.
        const longestChain = await longestValidChain();
        parsedUser.set({ chain: longestChain });
      } else {
        console.log("Set genesis block", GENESIS_BLOCK);
        parsedUser.set({ chain: GENESIS_BLOCK });
      }
      await parsedUser.save();
      res.status(201).json({ token });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ status: "error", message: String(error) });
  }
});

app.post("/login", async (req, res) => {
  try{
    const userExists = await User.findOne({ email: req.body.email });
    console.log(req.body)
  if (!userExists) {
    return res
      .status(400)
      .json({ status: "error", message: "Invalid email address" });
  }
  if (!bcrypt.compareSync(req.body.password, userExists.password)) {
    return res
      .status(400)
      .json({ status: "error", message: "Invalid password" });
  }

  const token = jwt.sign({ _id: userExists._id }, process.env.SECRET);
  res.status(200).json({ token });
  }
  catch(error)
  {
    console.error(error)
    res.status(400).json({status:"error", message: error})
  }
  
});

mongoose.connect(
  process.env.DB_HOST,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("DB connected!!")
);

/**
 * What if someone edits a block on the database? the block hash will change and the next what should be done to the current block, should it be removed or should we create a decentralized system for clients which in turn we would need to create user nodes.
 */
