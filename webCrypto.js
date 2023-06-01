// Import the WebCrypto API
const crypto = window.crypto;

// Generate a random key
async function generateKey() {
  const key = await crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
  return key;
}

// Encrypt some data
async function encryptData() {
  const key = await generateKey();

  const data = new TextEncoder().encode(
    "This is how data will be encoded and decoded"
  );
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encryptedData = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv },
    key,
    data
  );

  return {
    key: key,
    iv: iv,
    encryptedData: encryptedData,
  };
}

// Decrypt the encrypted data
async function decryptData(encryptedData, key) {
  const decryptedData = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: encryptedData.iv },
    key,
    encryptedData.encryptedData
  );

  return decryptedData;
}

// Usage
encryptData()
  .then((encryptedData) => {
    console.log("Encrypted data:", encryptedData.encryptedData);
    return decryptData(encryptedData, encryptedData.key);
  })
  .then((decryptedData) => {
    const decodedData = new TextDecoder().decode(decryptedData);
    console.log("Decrypted data:", decodedData);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
