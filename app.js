import express from 'express';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import accountRoutes from './routes/accountRoutes.js';
import transferRoutes from './routes/transferRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/account", accountRoutes);
app.use("/api/transfer", transferRoutes);


app.get("/", (req, res) => {
    res.json({
        message: "Bank API is running"
    });
});

export default app