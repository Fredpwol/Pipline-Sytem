const User = require("./user/User");
const jwt = require("jsonwebtoken");

exports.longestValidChain = async () => {
    const count = await User.count({});
    if (count > 100){
        var users = await User.find({}).limit(Math.floor(count / 2));
    }
    else{
        var users = await User.find(count);
    }
    var longestCount = -Infinity;
    var longestChain = [];
    // check if half of the user have a valid chain.
    for (var i=0; i < users.length; i++ ){
        if (user.verifyChain() && user.chain.length > longestCount) {
            longestChain = user.chain;
            longestCount = user.chain.length;
        }
    }
    return longestChain;
}

exports.isAuthenticated = (req, res, next) => {
    if (!req.headers.authorization) {
      return res.status(401).send("Invalid credentials");
    }
    try{
        const body = jwt.verify(req.headers.authorization, process.env.SECRET);
        console.log(body)
        req.user = body;
        next()
    }
    catch{
      res.status(401).send("UnAuthorized Access!")
    }
    console.log(body);
  }
  