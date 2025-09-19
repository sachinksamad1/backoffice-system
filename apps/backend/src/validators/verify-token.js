// This script verifies a JWT token using the 'jsonwebtoken' package.
// To run this script, use: node apps/backend/src/validators/verify-token.js
import jwt from 'jsonwebtoken';

// 👇 paste your JWT here
const token = your_user_token_here; // e.g., "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

// 👇 use the same secret as your backend (from .env or fallback)
const secret = process.env.JWT_SECRET || "supersecretkey";

try {
  const decoded = jwt.verify(token, secret);
  console.log("✅ Token is valid!");
  console.log("Decoded Payload:", decoded);
} catch (err) {
  console.error("❌ Invalid token:", err.message);
}
