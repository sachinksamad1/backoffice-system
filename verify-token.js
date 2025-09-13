// verify-token.js
import jwt from 'jsonwebtoken';

// 👇 paste your JWT here
const token = "PASTE_YOUR_JWT_HERE";

// 👇 use the same secret as your backend (from .env or fallback)
const secret = process.env.JWT_SECRET || "supersecretkey";

try {
  const decoded = jwt.verify(token, secret);
  console.log("✅ Token is valid!");
  console.log("Decoded Payload:", decoded);
} catch (err) {
  console.error("❌ Invalid token:", err.message);
}
