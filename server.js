const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 10000;

app.prepare().then(() => {
  const server = express();

  // Middleware
  server.use(cors());
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  // MongoDB Connection
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

  // API Routes (must come before Next.js handler)
  server.use('/api/auth', require('./server/routes/auth'));
  server.use('/api/resume', require('./server/routes/resume'));
  server.use('/api/bot', require('./server/routes/bot'));
  server.use('/api/chat', require('./server/routes/chat'));

  // Health Check
  server.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'ResumeBot API is running' });
  });

  // Let Next.js handle all other routes
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`🚀 Server ready on port ${PORT}`);
    console.log(`📱 Frontend: http://localhost:${PORT}`);
    console.log(`🔌 API: http://localhost:${PORT}/api`);
  });
});
