const express = require("express");
const mongoose = require("mongoose");
const User = require("../user/User");
const { longestValidChain, isAuthenticated } = require("../utils");

const router = express.Router();

router.post("/broadcast", isAuthenticated, async (req, res) => {
  // validattion later
  try{
    const broadcaster = await User.findOne({ _id: req.user._id });
    if (broadcaster) {
      if (broadcaster.isBroadCaster && broadcaster.isVerified) {
        const users = await User.find({ isBroadCaster: false });
        const longestChain = await longestValidChain();
        const block = req.body;
        block.broadcaster = broadcaster.publicKey;
        console.log(longestChain)
        const previousHash = longestChain[longestChain.length - 1].hash;
        block.previousBlockHash = previousHash;
        const data = JSON.stringify(
          Object.entries({
            previousBlockHash: block.previousBlockHash,
            PH: block.PH,
            density: block.density,
            temperature: block.temperature,
            pressure: block.pressure,
          }).sort()
        )
        console.log(data)
        block.signature = broadcaster.signData(data);
        users.forEach(async (user) => {
          if (user.verifyChain() && user.chain.length === longestChain.length) {
            await user.update({
              $push: {
                chain: block,
              },
            });
          } else {
            // update invalid chain to the longest valid chain
            user.set({ chain: longestChain });
            await user.save();
            await user.update({
              $push: {
                chain: block,
              },
            });
          }
          await user.save();
        });
        res.status(201).json("Successfully broadcasted");
      } else {
        res
          .status(400)
          .json({ status: "error", message: "Invalid access privilage" });
      }
    } else {
      res.status(401).json({ status: "error", message: "Unauthorized Access" });
    }
  }catch(e){
    console.error(e)
    res.status(400).send({message: String(e)})
  }

});

router.get("/latest", isAuthenticated, async (req, res) => {
  const user = await User.findById({ _id: req.user._id });
  if (!user){
    return res.status(403).json({status: "error", message:"user not found"})
  }
  if (user.chain.length > 1){
    res.status(200).json({ status: "ok", block:user.chain[user.chain.length-1]})
  }
  else{
    res.status(200).json({status: "ok", block:{}})
  }
})

router.get("/", isAuthenticated, async (req, res) => {
  const user = await User.findById({ _id: req.user._id });
  res.status(200).json(user.chain);
});

module.exports = router;
