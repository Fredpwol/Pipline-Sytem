const mongoose = require("mongoose");
const crypto = require("crypto");

const BlockSchema = new mongoose.Schema({
  previousBlockHash: {
    type: String,
    required: true,
    min: 1,
  },
  vibration: {
    type: Number,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
  flowRate: {
    type: Number,
    required: true,
  },
  broadcaster: {
    type: String,
    required: true,
  },
  signature: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

class BlockClass {
  get hash() {
    var sha256 = crypto.createHash("sha256");
    sha256.update(this.serializeBlock);
    return sha256.digest("hex");
  }

  get serializeBlock() {
    return JSON.stringify(
      Object.entries({
        previousBlockHash: this.previousBlockHash,
        vibration: this.vibration,
        temperature: this.temperature,
        flowRate: this.flowRate
     }).sort()
    );
  }
}

BlockSchema.loadClass(BlockClass);

module.exports = { BlockSchema, Block: mongoose.model("Block", BlockSchema) };
