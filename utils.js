const User = require("./user/User");
const jwt = require("jsonwebtoken");

exports.longestValidChain = async () => {
  const count = await User.count({
    isBroadCaster: false
  });
  if (count > 100) {
    var users = await User.find({
      isBroadCaster: false
    }).limit(Math.floor(count / 2));
  } else {
    var users = await User.find({
      isBroadCaster: false
    });
  }
  let longestCount = -Infinity;
  let longestChain = [];
  // check if half of the user have a valid chain.
  for (var i = 0; i < users.length; i++) {
    var user = users[i];
    console.log("verified", user.verifyChain());
    if (user.verifyChain() && user.chain.length > longestCount) {
      longestChain = user.chain;
      longestCount = user.chain.length;
    }
  }
  return longestChain;
};

function authenticate(token) {
  return jwt.verify(token, process.env.SECRET);
}

exports.isAuthenticated = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Invalid credentials");
  }
  try {
    const user = authenticate(req.headers.authorization.replace("Bearer ", ""));
    req.user = user;
    next();
  } catch {
    res.status(401).send("UnAuthorized Access!");
  }
};

exports.isBroadCaster = async (req, res, next) => {
  try {
    const user = authenticate(req.query.API_KEY);
    req.user = user;
    const broadcaster = await User.findOne({
      _id: req.user._id
    });
    if (broadcaster && broadcaster.isVerified && broadcaster.isBroadCaster) {
      next();
    } else {
      res.status(401).send("Invalid access privilage");
    }
  } catch (err) {
    console.log(err)
    res.status(401).send("UnAuthorized Access!");
  }
};