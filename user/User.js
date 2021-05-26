const mongoose = require("mongoose");
const crypto = require("crypto");

const { BlockSchema } = require("../block/Block");

const UserSchema = mongoose.Schema({
  organization: {
    type: String,
    requried: true,
  },
  email: {
    type: String,
    requried: true,
    unique:true
  },
  password: {
    type: String,
    requried: true,
    min: 6,
  },
  isVerified: Boolean,
  publicKey: String,
  privateKey: String,
  isBroadCaster: {
    type: Boolean,
    default: false,
  },
  chain: [BlockSchema],
});

class UserClass {
  verifyChain() {
    // start looping from index 1 to avoid verifying the gensis block
    for (var i = 1; i < this.chain.length; i++) {
      if (
        !this.verifyData(this.chain[i].serializeBlock, this.chain[i].signature) ||
        this.chain[i].previousHash !== this.chain[i - 1].hash
      ) {
        return false;
      }
    }
    return true;
  }

  signData(data) {
    if (data.length === 0 || this.isBroadCaster === false) {
      throw TypeError("Invalid data or access");
    }
    const signature = crypto.sign("SHA256", Buffer.from(data), {
      key: this.privateKey,
      padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
      passphrase: process.env.SECRET,
    });
    return signature.toString("base64");
  }

  verifyData(data, signature) {
    if (data.length === 0 || this.isBroadCaster === false) {
      throw TypeError("Invalid data or access");
    }
    return crypto.verify(
      "SHA256",
      Buffer.from(data),
      {
        key: this.publicKey,
        padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
        passphrase: process.env.SECRET,
      },
      Buffer.from(signature, "base64")
    );
  }

  static generateBroadCasterKeys() {
    const keys = crypto.generateKeyPairSync("rsa", {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: "spki",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs8",
        format: "pem",
        cipher: "aes-256-cbc",
        passphrase: process.env.SECRET,
      },
    });
    return keys;
  }
}

UserSchema.loadClass(UserClass);

module.exports = mongoose.model("users", UserSchema);
