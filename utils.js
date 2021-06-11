const User = require("./user/User");
const jwt = require("jsonwebtoken");

exports.longestValidChain = async () => {
  const count = await User.count({ isBroadCaster: false });
  if (count > 100) {
    var users = await User.find({ isBroadCaster: false }).limit(
      Math.floor(count / 2)
    );
  } else {
    var users = await User.find({ isBroadCaster: false });
  }
  var longestCount = -Infinity;
  var longestChain = [];
  // check if half of the user have a valid chain.
  for (var i = 0; i < users.length; i++) {
    var user = users[i];
    console.log("verified", user.verifyChain())
    if (user.verifyChain() && user.chain.length > longestCount) {
      longestChain = user.chain;
      longestCount = user.chain.length;
    }
  }
  return longestChain;
};

exports.isAuthenticated = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Invalid credentials");
  }
  try {
    const body = jwt.verify(
      req.headers.authorization.replace("Bearer ", ""),
      process.env.SECRET
    );
    console.log(body);
    req.user = body;
    next();
  } catch {
    res.status(401).send("UnAuthorized Access!");
  }
};
