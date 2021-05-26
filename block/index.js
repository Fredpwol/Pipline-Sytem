const express = require("express");
const mongoose = require("mongoose");
const User = require("../user/User");
const { longestValidChain, isAuthenticated } = require("../utils");

const router = express.Router();


router.post("/broadcast", isAuthenticated ,async (req, res) => {
  // validattion later
  const broadcaster = await User.findById({_id: req.user._id})
  if (broadcaster){
    if (broadcaster.isBroadCaster && broadcaster.isVerified){
      const users = await User.find({isBroadCaster: false});
      const block = req.body;
      block.signature = broadcaster.signData(block.serializeBlock);
      const longestChain = await longestValidChain();
      users.forEach(async (user) => {
        if (user.verifyChain() && user.chain.length === longestChain.length) {
          await user.update({
            $push: {
              chain: block,
            },
          });
        } else {
            // update invalid chain to the longest valid chain
            await user.update({$set: {
              chain: longestChain
            }});
            await user.update({
              $push: {
                chain: block,
              },
            });
        }
        await user.save()
      });
    }
    else{
      res.status(400).json({status: "error", message:"Invalid access privilage"})
    }
  }
  else{
    res.status(401).json({status:'error', message:"Unauthorized Access"})
  }
  
});

module.exports = router;
