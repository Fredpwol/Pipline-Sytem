const mongoose = require("mongoose");
const crypto = require("crypto");

const BlockSchema = new mongoose.Schema({
  previousBlockHash: {
    type: String,
    required: true,
    min: 1,
  },
  PH: {
    type: Number,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
  pressure: {
    type: Number,
    required: true,
  },
  broadcaster: {
    type: String,
    required: true,
  },
  signature: String,
  density: {
    type: Number,
    required: true,
  },
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
        PH: this.PH,
        density: this.density,
        temperature: this.temperature,
        pressure: this.pressure
     }).sort()
    );
  }
}

BlockSchema.loadClass(BlockClass);

module.exports = { BlockSchema, Block: mongoose.model("Block", BlockSchema) };
