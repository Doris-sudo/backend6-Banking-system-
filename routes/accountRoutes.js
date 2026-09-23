import express from 'express';

import {
    getBalance,
    createPin,
    updatePin,
    deposit
} from '../controllers/accountController.js';

import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddlware from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get("/balance", authMiddleware, getBalance);
router.post("/pin", authMiddleware, createPin);
router.patch("/updatepin", authMiddleware, updatePin);
router.post("/deposit", authMiddleware, deposit);
router.post("/deposit", authMiddleware, adminMiddlware, deposit);

export default router;