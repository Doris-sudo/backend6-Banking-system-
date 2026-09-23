import express from 'express';

import {
    getBalance,
    createPin,
    updatePin
} from '../controllers/accountController.js';

import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get("/balance", authMiddleware, getBalance);
router.post("/pin", authMiddleware, createPin);
router.patch("/pin", authMiddleware, updatePin);

export default router;