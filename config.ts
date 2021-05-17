require('dotenv').config();

// 3000 is standard
export const PORT = parseInt(process.env.PORT) || 3000;

// Postgres URI
export const DATABASE_URL =
  process.env.DATABASE_URL || `postgres://${process.env.USER}@localhost/keystone`;

// Default to 30 days
export const SESSION_MAX_AGE = parseInt(process.env.SESSION_MAX_AGE) || 60 * 60 * 24 * 30;

// Default to a secure random string on each app start
// This will cause all sessions to be revoked unless the env var is suppled
export const SESSION_SECRET =
  process.env.SESSION_MAX_AGE ||
  require('crypto')
    .randomBytes(32)
    .toString('base64')
    .replace(/[^a-zA-Z0-9]+/g, '');
