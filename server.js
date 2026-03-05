const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production';

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// In-memory user store (replace with a database in production)
const users = [
  {
    id: 1,
    username: 'admin',
    // bcrypt hash for 'password123'
    passwordHash: '$2a$10$QPN8UVT9FZgTJeaMCuxc6OKq2Md74ynoBU8wEDEMQ/lgF4z38yoSW',
  },
];

function findUserByUsername(username) {
  return users.find((u) => u.username === username) || null;
}

/**
 * POST /api/login
 * Body: { username: string, password: string }
 * Returns: { token: string } on success, or { error: string } on failure
 */
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const user = findUserByUsername(username);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const passwordMatch = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatch) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: '1h',
  });

  return res.status(200).json({ token });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
