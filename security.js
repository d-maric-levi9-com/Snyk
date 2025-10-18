// Vulnerable JavaScript Application - FOR TESTING PURPOSES ONLY
// This file contains intentional security vulnerabilities for Snyk Code testing

const express = require('express');
const mysql = require('mysql');
const crypto = require('crypto');
const fs = require('fs');
const { exec } = require('child_process');
const app = express();

// ============================================
// 1. HARDCODED CREDENTIALS
// ============================================
const dbPassword = 'SuperSecret123!';
const apiKey = 'sk_live_51HqJ8uL2K3M4N5O6P7Q8R9S';
const AWS_SECRET = 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY';

// ============================================
// 2. SQL INJECTION VULNERABILITIES
// ============================================
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: dbPassword,
  database: 'myapp'
});

app.get('/user', (req, res) => {
  const userId = req.query.id;
  // SQL Injection vulnerability - unsanitized user input
  const query = `SELECT * FROM users WHERE id = ${userId}`;
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  // SQL Injection vulnerability
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// ============================================
// 3. CROSS-SITE SCRIPTING (XSS)
// ============================================
app.get('/search', (req, res) => {
  const searchTerm = req.query.q;
  // XSS vulnerability - unescaped user input
  res.send(`<h1>Search Results for: ${searchTerm}</h1>`);
});

app.get('/profile', (req, res) => {
  const name = req.query.name;
  // Reflected XSS
  res.send(`<html><body><h1>Welcome ${name}!</h1></body></html>`);
});

// ============================================
// 4. COMMAND INJECTION
// ============================================
app.get('/ping', (req, res) => {
  const host = req.query.host;
  // Command injection vulnerability
  exec(`ping -c 4 ${host}`, (error, stdout, stderr) => {
    if (error) {
      res.send(`Error: ${error.message}`);
      return;
    }
    res.send(stdout);
  });
});

app.get('/backup', (req, res) => {
  const filename = req.query.file;
  // Command injection
  exec(`tar -czf backup.tar.gz ${filename}`, (error, stdout) => {
    res.send('Backup created');
  });
});

// ============================================
// 5. PATH TRAVERSAL
// ============================================
app.get('/download', (req, res) => {
  const filename = req.query.file;
  // Path traversal vulnerability
  const filepath = `/var/www/files/${filename}`;
  res.sendFile(filepath);
});

app.get('/read', (req, res) => {
  const file = req.query.file;
  // Path traversal
  fs.readFile(`./uploads/${file}`, 'utf8', (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

// ============================================
// 6. INSECURE CRYPTOGRAPHIC PRACTICES
// ============================================
function hashPassword(password) {
  // Weak hashing algorithm
  return crypto.createHash('md5').update(password).digest('hex');
}

function encryptData(data) {
  // Weak encryption algorithm
  const cipher = crypto.createCipher('des', 'weakkey');
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// Insecure random number generation
function generateToken() {
  return Math.random().toString(36).substring(2);
}

// ============================================
// 7. INSECURE DESERIALIZATION
// ============================================
app.post('/deserialize', (req, res) => {
  const userData = req.body.data;
  // Unsafe deserialization
  const obj = eval('(' + userData + ')');
  res.send(obj);
});

app.post('/load', (req, res) => {
  // Dangerous use of eval
  const code = req.body.code;
  eval(code);
  res.send('Code executed');
});

// ============================================
// 8. OPEN REDIRECT
// ============================================
app.get('/redirect', (req, res) => {
  const url = req.query.url;
  // Open redirect vulnerability
  res.redirect(url);
});

// ============================================
// 9. REGEX DENIAL OF SERVICE (ReDoS)
// ============================================
app.post('/validate', (req, res) => {
  const input = req.body.input;
  // Vulnerable regex pattern
  const regex = /^(a+)+$/;
  if (regex.test(input)) {
    res.send('Valid');
  } else {
    res.send('Invalid');
  }
});

// ============================================
// 10. PROTOTYPE POLLUTION
// ============================================
function merge(target, source) {
  for (let key in source) {
    // Prototype pollution vulnerability
    target[key] = source[key];
  }
  return target;
}

app.post('/merge', (req, res) => {
  const obj = {};
  merge(obj, req.body);
  res.send(obj);
});

// ============================================
// 11. INSECURE RANDOM VALUES
// ============================================
function generateSessionId() {
  // Weak random for security-sensitive context
  return Math.random().toString();
}

function generatePassword() {
  // Predictable password generation
  return Math.floor(Math.random() * 10000).toString();
}

// ============================================
// 12. MISSING INPUT VALIDATION
// ============================================
app.post('/create-user', (req, res) => {
  const { username, email, age } = req.body;
  // No input validation
  const user = {
    username: username,
    email: email,
    age: age
  };
  res.send(`User created: ${JSON.stringify(user)}`);
});

// ============================================
// 13. INFORMATION DISCLOSURE
// ============================================
app.get('/error', (req, res) => {
  try {
    // Some operation
    throw new Error('Database connection failed: localhost:3306 user=admin password=secret');
  } catch (err) {
    // Exposing sensitive error information
    res.status(500).send(`Error: ${err.message}\nStack: ${err.stack}`);
  }
});

// ============================================
// 14. INSECURE FILE UPLOAD
// ============================================
app.post('/upload', (req, res) => {
  const filename = req.body.filename;
  const content = req.body.content;
  // No file type validation
  fs.writeFileSync(`./uploads/${filename}`, content);
  res.send('File uploaded');
});

// ============================================
// 15. WEAK TLS/SSL CONFIGURATION
// ============================================
const https = require('https');
const httpsOptions = {
  // Weak SSL/TLS settings
  secureProtocol: 'TLSv1_method',
  ciphers: 'RC4',
  rejectUnauthorized: false
};

// ============================================
// 16. NOSQL INJECTION
// ============================================
const mongodb = require('mongodb');
app.post('/find-user', async (req, res) => {
  const username = req.body.username;
  const db = await mongodb.connect('mongodb://localhost:27017');
  // NoSQL injection vulnerability
  const user = await db.collection('users').findOne({ username: username });
  res.send(user);
});

// ============================================
// 17. TIMING ATTACK VULNERABILITY
// ============================================
function comparePasswords(input, stored) {
  // Vulnerable to timing attacks
  return input === stored;
}

app.post('/auth', (req, res) => {
  const password = req.body.password;
  const storedPassword = 'supersecret123';
  if (comparePasswords(password, storedPassword)) {
    res.send('Authenticated');
  } else {
    res.send('Failed');
  }
});

// ============================================
// 18. INSECURE CORS CONFIGURATION
// ============================================
app.use((req, res, next) => {
  // Overly permissive CORS
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// ============================================
// 19. INSUFFICIENT LOGGING
// ============================================
app.post('/delete-account', (req, res) => {
  const userId = req.body.userId;
  // No logging of sensitive operation
  deleteUser(userId);
  res.send('Account deleted');
});

// ============================================
// 20. BUFFER OVERFLOW
// ============================================
app.post('/process', (req, res) => {
  const data = req.body.data;
  // Potential buffer overflow
  const buffer = Buffer.allocUnsafe(100);
  buffer.write(data);
  res.send(buffer.toString());
});

function deleteUser(userId) {
  // Mock function
  console.log(`Deleting user ${userId}`);
}

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Admin password: ${dbPassword}`);
});

// Export for testing
module.exports = { 
  hashPassword, 
  encryptData, 
  generateToken, 
  comparePasswords,
  merge
};

