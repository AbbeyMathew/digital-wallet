require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",   // your frontend URL (Vite default)
    credentials: true
}));

connectDB(process.env.MONGO_URI).catch(err => { console.error(err); process.exit(1); });

app.use('/api/auth', require('./routes/auth'));
app.use('/api/wallet', require('./routes/wallet'));
app.use((err, req, res, next) => { console.error(err); res.status(err.status||500).json({message:err.message||'Server error'}); });

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
