// The crypto module provides cryptographic functionality that includes a set of wrappers for OpenSSL's hash, HMAC, cipher, decipher, sign, and verify functions.

const crypto = require("crypto"); //import the crypto library

const key = crypto.randomBytes(32); //*generate a random string from the given string for the key
// console.log(key);
const message = "john is a fool"; //!the message to display when  the message is received from the server

const iv = crypto.randomBytes(16); //?generate a random string buffer to store the message contents

console.log(iv);

//encryption starts here and encrypt the message using the given algorithm
const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

let encrypted = cipher.update(message, "utf-8", "hex");

encrypted += cipher.final("hex"); // encrypted

//decrypt the message using the encrypted key that was genereated

const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);

let decrypted = decipher.update(encrypted, "hex", "utf-8");

decrypted += decipher.final("utf-8");

//print the encrypted data and the decrypted data to the console
console.log("Encrypted data :", encrypted);
console.log("Decrypted data :", decrypted);
