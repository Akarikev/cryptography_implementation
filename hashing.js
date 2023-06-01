const crypto = require("crypto"); // Create a hash

const hash = crypto.createHash("sha256"); // Update the hash with the data you want to hash

hash.update("my-data-to-hash"); // Get the final hash as a hexadecimal string

const hashString = hash.digest("hex");

console.log(hashString); // Outputs a long string of characters
