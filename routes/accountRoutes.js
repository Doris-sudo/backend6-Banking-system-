import express from 'express';

import {
    getBalance,
    createPin,
    updatePin,
    deposit
} from '../controllers/accountController.js';

import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get("/balance", authMiddleware, getBalance);
router.post("/pin", authMiddleware, createPin);
router.patch("/updatepin", authMiddleware, updatePin);
router.post("/deposit", authMiddleware, deposit);

export default router;