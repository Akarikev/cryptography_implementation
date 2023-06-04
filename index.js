const crypto = require("crypto"); // Import the crypto library
const readline = require("readline"); // Import the readline module for user input

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to generate a random key of appropriate length and complexity
function generateRandomKey() {
  const keyLength = 32; // Key length for AES-256 (in bytes)
  const randomBytes = crypto.randomBytes(keyLength);
  return randomBytes;
}

// Function to encrypt the message
function encryptMessage(message, key) {
  const iv = crypto.randomBytes(16); // Generate a random initialization vector (IV)

  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

  let encrypted = cipher.update(message, "utf-8", "hex");
  encrypted += cipher.final("hex");

  return {
    iv: iv.toString("hex"),
    encryptedMessage: encrypted
  };
}

// Function to decrypt the message
function decryptMessage(encryptedMessage, key, iv) {
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, Buffer.from(iv, "hex"));

  let decrypted = decipher.update(encryptedMessage, "hex", "utf-8");
  decrypted += decipher.final("utf-8");

  return decrypted;
}

// Ask the user to enter the message to be encrypted
rl.question("Enter the message to be encrypted: ", (message) => {
  const key = generateRandomKey(); // Generate a random key
  console.log("Generated key:", key.toString("hex"));

  const encryptedData = encryptMessage(message, key);
  console.log("Encrypted message:", encryptedData.encryptedMessage);

  rl.question("Enter the key to decrypt the message: ", (userKey) => {
    const decryptedData = decryptMessage(
      encryptedData.encryptedMessage,
      Buffer.from(userKey, "hex"),
      encryptedData.iv
    );
    console.log("Decrypted message:", decryptedData);

    rl.close(); // Close the readline interface
  });
});
