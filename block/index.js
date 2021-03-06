const express = require("express");
const mongoose = require("mongoose");
const User = require("../user/User");
const { Block } = require("./Block");
const {
  longestValidChain,
  isAuthenticated,
  isBroadCaster,
} = require("../utils");

const router = express.Router();

router.get("/broadcast", isBroadCaster, async (req, res) => {
  // validattion later
  try {
    const broadcaster = await User.findOne({
      _id: req.user._id,
    });
    const users = await User.find({
      isBroadCaster: false,
    });
    const longestChain = await longestValidChain();
    const block = {
      vibration: req.query.vibration,
      temperature: req.query.temperature,
      flowRate: req.query.flowRate,
    };
    block.broadcaster = broadcaster.publicKey;
    console.log(longestChain);
    const previousHash = longestChain[longestChain.length - 1].hash;
    block.previousBlockHash = previousHash;
    const data = JSON.stringify(
      Object.entries({
        previousBlockHash: block.previousBlockHash,
        vibration: block.vibration,
        temperature: block.temperature,
        flowRate: block.flowRate,
      }).sort()
    );
    console.log(data);
    block.signature = broadcaster.signData(data);
    users.forEach(async (user) => {
      if (user.verifyChain() && user.chain.length === longestChain.length) {
        await user.updateOne({
          $push: {
            chain: block,
          },
        });
      } else {
        // update invalid chain to the longest valid chain
        user.set({
          chain: longestChain,
        });
        await user.save();
        await user.updateOne({
          $push: {
            chain: block,
          },
        });
      }
      await user.save();
    });
    res.status(201).json("Successfully broadcasted");
  } catch (e) {
    console.error(e);
    res.status(400).send({
      message: String(e),
    });
  }
});

router.get("/latest", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById({
      _id: req.user._id,
    });
    if (!user) {
      return res.status(403).json({
        status: "error",
        message: "user not found",
      });
    }
    if (user.chain.length > 1) {
      res.status(200).json({
        status: "ok",
        block: user.chain[user.chain.length - 1],
      });
    } else {
      res.status(200).json({
        status: "ok",
        block: {},
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "error",
      message: String(error),
    });
  }
});

router.get("/", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById({
      _id: req.user._id,
    });
    if (!user) {
      return res.status(403).json({
        status: "error",
        message: "user not found",
      });
    }
    res.status(200).json({
      status: "ok",
      blocks: user.chain.reverse(),
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      status: "error",
      message: String(err),
    });
  }
});

router.get("/:_id", isAuthenticated, async (req, res) => {
  const user = await User.findById({
    _id: req.user._id,
  });
  if (!user) {
    return res.status(403).json({
      status: "error",
      message: "user not found",
    });
  }

  const block = user.chain.filter((data) => data._id == req.params._id);
  if (block.length < 1) {
    return res.status(404).json({
      status: "error",
      message: "Block not found",
    });
  }
  res.status(200).json({
    status: "ok",
    block: block[0],
  });
});


router.get("/timeline/all", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById({
      _id: req.user._id,
    });
    const data = user.chain.map((block) => ({
      vibration: block.vibration || 0,
      timestamp: block.timestamp,
      temperature: block.temperature || 0,
      flowRate: block.flowRate || 0,
    }));
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: String(error),
    });
  }
});

router.get("/timeline/:field", isAuthenticated, async (req, res) => {
  const { field } = req.params;
  const aceptableFields = ["vibration", "temperature", "flowrate"];
  if (!aceptableFields.includes(field.toLowerCase())) {
    return res.status(400).json({
      status: "error",
      message: "Sorry enter a valid field!",
    });
  }
  try {
    const user = await User.findById({
      _id: req.user._id,
    });
    const data = user.chain.map((block) => ({
      value: block[field] || 0,
      timestamp: block.timestamp,
    }));
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: String(error),
    });
  }
});


module.exports = router;
